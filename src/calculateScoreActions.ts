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

        //Add scores for new Score Tree
        if (action.type == 'add_scoretree') {
            claimIdsToScore.push(action.dataId)
            const claim = await repository.getClaim(action.dataId);
            if (claim) {
                const score = new Score(claim.id);
                const action = new Action(score, {}, "add_score", score.id);
                scoreActions.push(action);
                repository.notify([action]);
            }
        }

        //Add scores if edges adds new children to claims in score trees
        if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
            const claimEdge = action.newData as ClaimEdge;
            claimIdsToScore.push(claimEdge.parentId)
        }

        //Walk up the scores for each claim to the top
        for (const claimId of claimIdsToScore) {
            const scoresForTheClaim = await repository.getScoresByClaimId(claimId)
            for (const claimScore of scoresForTheClaim) {
                // for each score, walk up the tree looking for the top (the first score to not have a parentId)
                let currentScore: iScore | undefined = claimScore;
                let topScoreId = claimScore.id;
                while (currentScore?.parentScoreId) {
                    topScoreId = currentScore.id;
                    currentScore = await repository.getScore(currentScore.parentScoreId);
                }
                if (topScoreId) {
                    topScoreIds.push(topScoreId)
                }
            }
        }

        //Re-calc all top scores with possible changed claims
        for (const topScoreId of topScoreIds) {
            const topScore = await repository.getScore(topScoreId)
            if (topScore) {
                await createBlankMissingScores(repository, topScoreId, topScore.sourceClaimId || "", scoreActions)
                await repository.notify(scoreActions)
                await calculateScoreTree(repository, topScore, calculator, scoreActions);
            }
        }
    }

    return scoreActions;
}

//Create Blank Missing Scores
async function createBlankMissingScores(repository: iRepository, currentScoreId: string, currentClaimId: string, actions: Action[]) {
    const edges = await repository.getClaimEdgesByParentId(currentClaimId)
    const scores = await repository.getChildrenByScoreId(currentScoreId)
    for (const edge of edges) {
        //see if there is a matching child score for the child edge
        let score = scores.find(({ sourceClaimId }) => sourceClaimId === edge.childId);
        if (!score) {
            //Create a new Score and attach it to it's parent
            score = new Score(edge.childId, currentScoreId, undefined, edge.pro, edge.affects);
            actions.push(new Action(score, undefined, "add_score", score.id));
        }
        //Recurse and through children
        await createBlankMissingScores(repository, score.id, edge.childId, actions);
    }
}

//This function assume that all scores already exist
async function calculateScoreTree(repository: iRepository, currentScore: iScore, calculator: iCalculateScore = calculateScore, actions: Action[]) {
    const oldScores = await repository.getChildrenByScoreId(currentScore.id)
    const newScores: Score[] = [];

    for (const oldScore of oldScores) { //Calculate Children
        //TODO: remove any scores to calculate based on formulas
        newScores.push(await calculateScoreTree(repository, oldScore, calculator, actions));
    }

    const newScoreFragment = calculator({
        childScores: newScores,
        reversible: currentScore.reversible,
    })
    //TODO: Modify the newScore based on any formulas
    //TODO: Should we add the new scores to the repository (If they are different form the old score?)
    const newScore = { ...currentScore, ...newScoreFragment }
    debugger
    if (differentScores(currentScore, newScore)) {
        actions.push(new Action(newScore, undefined, "add_score", newScore.id));
    }
    return newScore;
}
