import { Score, differentScores, iScore } from "./dataModels/Score";
import { Action } from "./dataModels/Action";
import { iCalculateScore, calculateScore } from "./calculateScore";
import { iRepository } from "./dataModels/iRepository";
import { ClaimEdge, iClaimEdge } from "./dataModels/ClaimEdge";
import { RepositoryLocalPure } from "./repositories/RepositoryLocalPure";
import { ScoreTree } from ".";

/**
 * Calculates the score actions based on a list of actions
 */
export async function calculateScoreActions({ actions = [], repository = new RepositoryLocalPure(), calculator = calculateScore }: {
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
    const ScoreTreeIds: string[] = [];

    await repository.notify(actions);
    for (const action of actions) {

        // find claims that may need scores changed
        if (action.type == 'add_claim' || action.type == 'modify_claim') {
            claimIdsToScore.push(action.dataId)
        }

        if (action.type == "add_score") {
            let score = action.newData as iScore;
            if (!score.parentId) {
                const scoreTemp = await repository.getScore(action.dataId)
                if (scoreTemp) {
                    score = scoreTemp;
                }
            }

            claimIdsToScore.push(score.sourceClaimId)
        }

        //Add scores if edges adds new children to claims in score trees
        if (action.type == 'add_claimEdge' || action.type == 'modify_claimEdge') {
            let claimEdge = action.newData as iClaimEdge;
            if (!claimEdge.parentId) {
                const claimEdgeTemp = await repository.getClaimEdge(action.dataId)
                if (claimEdgeTemp) {
                    claimEdge = claimEdgeTemp;
                }
            }
            claimIdsToScore.push(claimEdge.parentId)
        }

        //TODO: If an edge changes then modify the existing scores to match
        if (action.type == 'modify_claimEdge') {
            let claimEdge = await repository.getClaimEdge(action.dataId)
            claimEdge = { ...claimEdge, ...action.newData }
            if (claimEdge) {
                action.newData as ClaimEdge;
                const scores = await repository.getScoresBySourceId(claimEdge.id)
                for (const score of scores) {
                    //TODO: Where should I put this? It is modifying am object. If it is reactive i should just change the data. If pure it should be a new object.
                    //For now I will modify it but it may not trigger updates in a pure library (React)
                    //This change should also probably be centralized somewhere to reduce the chance of inconsistent bugs. I think it will happen in multiple paces
                    //Nope, it is an action so it should always be a new object. If it goes into a reactive respoitory then it will modify the actual object
                    //Should I group these actions or just throw them in one at a time like I am doing
                    if (score.pro != claimEdge.pro ||
                        score.affects != claimEdge.affects) {
                        const action = new Action({
                            pro: claimEdge.pro,
                            affects: claimEdge.affects,
                            priority: claimEdge.priority,
                        }, score, "modify_score", score.id)
                        scoreActions.push(action);
                        await repository.notify([action]);
                    }
                }
            }
        }

        if (action.type == 'delete_claimEdge') {
            const oldClaimEdge = action.oldData as ClaimEdge;
            claimIdsToScore.push(oldClaimEdge.parentId)
        }

        if (action.type == 'add_scoreTree') {
            const scoreTree = action.newData as ScoreTree;
            ScoreTreeIds.push(scoreTree.id)
        }
        
    }

    //Walk up the scores for each claim to the top
    for (const claimId of claimIdsToScore) {
        for (const claimScore of await repository.getScoresBySourceId(claimId)) {
                ScoreTreeIds.push(claimScore.scoreTreeId)
        }
    }

    //Re-calc all Score Trees with possible changed claims
    for (const scoreTreeId of ScoreTreeIds) {
        const scoreTree = await repository.getScoreTree(scoreTreeId)
        if (scoreTree) {
            const tempMissingScoreActions: Action[] = [];

            let topScore = await repository.getScore(scoreTree.topScoreId);
            if (!topScore){
                topScore = new Score(scoreTree.sourceClaimId,scoreTree.id);
                topScore.id = scoreTree.topScoreId;
                tempMissingScoreActions.push(new Action(topScore,undefined,"add_score"));
            }

            await createBlankMissingScores(repository, scoreTree.topScoreId, scoreTree.sourceClaimId || "", tempMissingScoreActions, scoreTreeId)
            if (tempMissingScoreActions.length > 0) {
                await repository.notify(tempMissingScoreActions)
            }
            const tempcalculateScoreTreeActions: Action[] = [];

            await calculateScoreTree(repository, topScore, calculator, tempMissingScoreActions);
            scoreActions.push(...tempMissingScoreActions, ...tempcalculateScoreTreeActions)
        }
    }

    //TODO: Review this decision: Feed the score actions back into the repository so this repository is up to date in case it is used 
    await repository.notify(scoreActions);

    return scoreActions;
}

//Create Blank Missing Scores
async function createBlankMissingScores(repository: iRepository, currentScoreId: string, currentClaimId: string, actions: Action[], scoreTreeId: string) {
    const edges = await repository.getClaimEdgesByParentId(currentClaimId)
    const scores = await repository.getChildrenByScoreId(currentScoreId)
    for (const edge of edges) {
        //see if there is a matching child score for the child edge
        let score = scores.find(({ sourceClaimId }) => sourceClaimId === edge.childId);
        if (!score) {
            //Create a new Score and attach it to it's parent
            const u = undefined;
            score = new Score(edge.childId, scoreTreeId, currentScoreId, edge.id, undefined, edge.pro, edge.affects,u,u,u,edge.priority);
            actions.push(new Action(score, undefined, "add_score", score.id));
        }
        //Recurse and through children
        await createBlankMissingScores(repository, score.id, edge.childId, actions, scoreTreeId);
    }
}

//This function assume that all scores already exist
async function calculateScoreTree(repository: iRepository, currentScore: iScore, calculator: iCalculateScore = calculateScore, actions: Action[]) {
    const oldScores = await repository.getChildrenByScoreId(currentScore.id)
    const newScores: iScore[] = [];

    for (const oldScore of oldScores) { //Calculate Children
        //TODO: remove any scores to calculate based on formulas that exclude scores
        newScores.push(await calculateScoreTree(repository, oldScore, calculator, actions));
    }

    const newScoreFragment = calculator({
        childScores: newScores,
    })

    //TODO: Modify the newScore based on any formulas
    const newScore = { ...currentScore, ...newScoreFragment }
    if (differentScores(currentScore, newScore)) {
        actions.push(new Action(newScore, undefined, "modify_score", newScore.id));
    }
    return newScore;
}
