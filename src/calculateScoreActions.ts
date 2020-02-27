import { Score } from "./dataModels/Score";
import { Action } from "./dataModels/Action";
import { PureRepository } from "./PureRepository";
import { iCalculateScore, calculateScore } from "./calculateScore";
import { Claim } from "./dataModels/Claim";
import { iRepository } from "./dataModels/iRepository";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { newId } from "./newId";
import { ReactiveRepository } from "./ReactiveRepository";

/**
 * Calculates the score actions based on a list of actions
 */
export async function calculateScoreActions({ actions = [], repository = new ReactiveRepository(), calculator = calculateScore }: {
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
                const score = calculator({ sourceClaimId: claim.id });
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
                let currentScore: Score | undefined = claimScore;
                let topScoreId = claimScore.id;
                while (currentScore?.parentScoreId) {
                    topScoreId = currentScore.id;
                    currentScore = await repository.getScore(currentScore.parentScoreId);
                }
                topScoreIds.push(topScoreId)
            }
        }

        //Re-calc all top scores with possible changed claims
        for (const parentScoreId of topScoreIds) {
            const parentScore = await repository.getScore(parentScoreId)
            const newScore = await CalculateScoreTree(repository, parentScoreId, parentScore);
            scoreActions.push(new Action(newScore, undefined, "add_score", newScore.id))
        }

        //See if the scores actually changed
    }

    //TODO: Reduce duplication of scores? 
    return scoreActions;
}

async function CalculateScoreTree(repository: iRepository, sourceClaimId: string, parentScore: Score | undefined) {
    //const parentScore = await repository.getScore(parentScoreId)
    const childClaimEdges = await repository.getClaimEdgesByParentId(sourceClaimId)
    const childScores: Score[] = [];
    if (parentScore) {
        const childScores = await repository.getChildrenByScoreId(parentScore.id)
    }
    //loop through the edges at match up the scores. create a new one if one does not exist.
    //TODO: should we remove scores if the edge does not exist?
    const newScores: Score[] = [];
    for (const childClaimEdge of childClaimEdges) {
        let score = childScores.find(({ sourceClaimId }) => sourceClaimId === childClaimEdge.childId);
        newScores.push(await CalculateScoreTree(repository, childClaimEdge.childId, score));
    }

    return await calculateScore({ scores: newScores })

}



