import { Score, differentScores, iScore } from "./dataModels/Score";
import { Action } from "./dataModels/Action";
import { RepositoryLocalPure } from "./repositories/RepositoryLocalPure";
import { iCalculateScore, calculateScore } from "./calculateScore";
import { Claim } from "./dataModels/Claim";
import { iRepository } from "./dataModels/iRepository";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { newId } from "./newId";
import { RepositoryLocalReactive } from "./repositories/RepositoryLocalReactive";

/**
 * Calculates the score actions based on a list of actions
 */
export async function calculateScoreActions({ actions = [], repository = new RepositoryLocalReactive(), calculator = calculateScore }: {
    /** An array of actions, usually on claims or edges that incluse no scores*/
    actions?: Action[];
    /** The repository used to get context for the actions */
    repository?: iRepository;
    /** The function used to calculate the scores */
    calculator?: iCalculateScore;
} = {},
) {
    const scoreActions: Action[] = [];
    const claimIdsToScore: string[] = [];
    const topScoreIds: string[] = [];

    await repository.notify(actions);
    for (const action of actions) {

        // find claims that may need scores changed
        if (action.type == 'add_claim' || action.type == 'modify_claim') {
            claimIdsToScore.push(action.dataId)
        }

        if (action.type == "add_score") {
            const score = action.newData as Score;
            claimIdsToScore.push(score.sourceClaimId)
        }

        //Add scores if edges adds new children to claims in score trees
        if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
            const claimEdge = action.newData as ClaimEdge;
            claimIdsToScore.push(claimEdge.parentId)
        }

        //TODO: If an edge changes then modify the existing scores to match
        //Thsi wipes out the correct score but the score will be updated later on anyways
        if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
            const claimEdge = action.newData as ClaimEdge;
            const scores = await repository.getScoresBySourceId(claimEdge.id)
            for (const score of scores) {
                //TODO: Where should I put this? It is modifying am object. If it is reactive i should just change the data. If pure it should be a new object.
                //For now I will modify it but it may not trigger updates in a pure library (React)
                //This change should also probably be centralized somewhere to reduce the chance of inconsistent bugs. I think it will happen in multiple paces
                //Nope, it is an action so it should always be a new object. If it goes into a reactive respoitory then it will modify the actual object
                //Should I group these actions or just throw them in one at a time like I am doing

                //TODO: This is also looping in on itself making extra calculations because the modified score causes a re-calculation?
                debugger
                await repository.notify([new Action({
                    pro: claimEdge.pro,
                    affects: claimEdge.affects,
                }, score, "modify_score", score.id)])
            }
        }

        //Walk up the scores for each claim to the top
        for (const claimId of claimIdsToScore) {
            const scoresForTheClaim = await repository.getScoresBySourceId(claimId)

            for (const claimScore of scoresForTheClaim) {
                // for each score, walk up the tree looking for the top (the first score to not have a parentId)
                let currentScore: iScore | undefined = claimScore;
                let topScoreId = claimScore.id;
                do {
                    if (currentScore.parentScoreId) {
                        currentScore = await repository.getScore(currentScore.parentScoreId);
                    }
                    if (currentScore) {
                        topScoreId = currentScore.id;
                    }
                } while (currentScore?.parentScoreId)

                if (topScoreId) {
                    topScoreIds.push(topScoreId)
                }
            }
        }

        //Re-calc all top scores with possible changed claims
        for (const topScoreId of topScoreIds) {
            const topScore = await repository.getScore(topScoreId)
            if (topScore) {
                const tempMissingScoreActions: Action[] = [];
                await createBlankMissingScores(repository, topScoreId, topScore.sourceClaimId || "", tempMissingScoreActions, topScoreId)
                if (tempMissingScoreActions.length > 0) {
                    await repository.notify(tempMissingScoreActions)
                }
                const tempcalculateScoreTreeActions: Action[] = [];
                await calculateScoreTree(repository, topScore, calculator, tempMissingScoreActions);

                scoreActions.push(...tempMissingScoreActions, ...tempcalculateScoreTreeActions)
            }
        }
    }

    return scoreActions;
}

//Create Blank Missing Scores
async function createBlankMissingScores(repository: iRepository, currentScoreId: string, currentClaimId: string, actions: Action[], topScoreId: string) {
    const edges = await repository.getClaimEdgesByParentId(currentClaimId)
    const scores = await repository.getChildrenByScoreId(currentScoreId)
    for (const edge of edges) {
        //see if there is a matching child score for the child edge
        let score = scores.find(({ sourceClaimId }) => sourceClaimId === edge.childId);
        if (!score) {
            //Create a new Score and attach it to it's parent
            score = new Score(edge.childId, topScoreId, currentScoreId, edge.id, undefined, edge.pro, edge.affects);
            actions.push(new Action(score, undefined, "add_score", score.id));
        }
        //Recurse and through children
        await createBlankMissingScores(repository, score.id, edge.childId, actions, topScoreId);
    }
}

//This function assume that all scores already exist
async function calculateScoreTree(repository: iRepository, currentScore: iScore, calculator: iCalculateScore = calculateScore, actions: Action[]) {
    const oldScores = await repository.getChildrenByScoreId(currentScore.id)
    const newScores: iScore[] = [];

    for (const oldScore of oldScores) { //Calculate Children
        //TODO: remove any scores to calculate based on formulas
        newScores.push(await calculateScoreTree(repository, oldScore, calculator, actions));
    }

    const newScoreFragment = calculator({
        childScores: newScores,
        reversible: currentScore.reversible,
    })
    //TODO: Modify the newScore based on any formulas
    const newScore = { ...currentScore, ...newScoreFragment }
    if (differentScores(currentScore, newScore)) {
        actions.push(new Action(newScore, undefined, "modify_score", newScore.id));
    }
    return newScore;
}
