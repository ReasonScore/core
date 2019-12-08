import { Action } from "./dataModels/Action";
import { Repository } from "./Repository";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { calculateScore } from "./calculateScore";
import { Score, differentScores } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";
import { iRepository } from "./dataModels/iRepository";
import { newId } from "./newId";

export class CalculationInitator {

    constructor(
        public repo: iRepository,
        public subscriber: ((actions: Action[]) => void) | undefined = undefined
    ) {
    }

    /** this function can be called by outside code to notfy this repository of changes */
    async notify(actions: Action[]) {
        await this.repo.notify(actions);
        if (this.subscriber) {
            this.subscriber(actions);
        }
        await this.CalculationInitiator(actions);
    }

    private async CalculationInitiator(actions: Action[]) {
        for (const action of actions) {

            if (action.type == 'add_claimEdge') {
                const claimEdge = await this.repo.getClaimEdge(action.dataId);
                if (claimEdge) {
                    const childClaim = await this.repo.getClaim(claimEdge.childId);
                    if (childClaim) {
                        const scores = await this.repo.getScoresByClaimId(claimEdge.childId)
                        for (const score of scores) {
                            //await this.CalculateScoreTree(childClaim, score.id, claimEdge)
                        }
                    }
                }
            }

            if (action.type == 'modify_claimEdge') {
                const claimEdge = await this.repo.getClaimEdge(action.dataId);
                if (claimEdge) {
                    const scores = await this.repo.getScoresByClaimId(claimEdge.parentId);
                    for (const score of scores) {
                        await this.CalculateByScore(score)
                    }
                }
            }

            // Initiate calculations from a canged/new claim
            if (action.type == 'modify_claim') {
                const scores = await this.repo.getScoresByClaimId(action.dataId);
                for (const score of scores) {
                    await this.CalculateByScore(score)
                }
            }

            // Initiate calculations from a canged/new score
            if (action.type == 'add_score' || action.type == 'modify_score') {
                const score = await this.repo.getScore(action.dataId);
                if (score?.parentScoreId) await this.CalculateByScoreId(score.parentScoreId);
            }
        }
    }

    public async CalculateScoreTree(scores: Score[], claim: Claim, parentScoreId: string | undefined, claimEdge: ClaimEdge | undefined) {
        const childClaimEdges = await this.repo.getClaimEdgesByParentId(claim.id);
        const childScores: Score[] = [];
        const newScoreId = newId();
        debugger
        if (childClaimEdges.length > 0) {
            for (const childClaimEdge of childClaimEdges) {
                // TODO: Put code in here to see if this edge claim should really apply to it's parent (Scope, formula, etc..)
                const childClaim = await this.repo.getClaim(childClaimEdge.childId);
                if (childClaim) {
                    childScores.push(await this.CalculateScoreTree(scores,childClaim, newScoreId, childClaimEdge));
                }
            }
        }
        let newScore = calculateScore({
            scores: childScores,
            reversible: claim.reversible,
            sourceClaimId: claim.id,
        })
        newScore.parentScoreId = parentScoreId;
        newScore.id = newScoreId;
        if (claimEdge) newScore.pro = claimEdge.pro;
        scores.push(newScore);
        return newScore;
    }

    async CalculateByScoreId(scoreId: string) {
        const score = this.repo.getScore(scoreId);
        score || this.CalculateByScore(score);
    }

    async CalculateByScore(score: Score) {
        const childScores = await this.repo.getChildrenByScoreId(score.id)
        //const childClaimEdges = await this.repo.getClaimEdgesByParentId(score.sourceClaimId)
    }

    // async CalculateByClaimId(parentId: Id) {
    //     const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];
    //     //Is parent reversible?
    //     let reversible = false;
    //     const parentClaim = await this.repo.getClaim(parentId);
    //     if (parentClaim) {
    //         reversible = parentClaim.reversible;
    //     }

    //     //Ge all the childclaimEdges
    //     //get all the scores for the parentcliamid
    //     //for each parentcliamidscore check to see that it has child scores for each childclaimEdge, 
    //     //if not, calculate it

    //     //Should I assume that all other scores are made and have a different process generate the full chain?
    //     //Should I generate everything attached to 

    //     //Get all the claims for the parent to calculate the score
    //     const claimseEdges = await this.repo.getClaimEdgesByParentId(parentId);
    //     const parentClaimScores
    //     for (const claimseEdge of claimseEdges) {
    //         let scoreItem = await this.repo.getScoresByClaimId(claimseEdge.childId)
    //         if (!scoreItem) {
    //             scoreItem = await this.CalculateByClaimId(claimseEdge.childId);
    //         }
    //         scoreAndClaimEdges.push(
    //             new ScoreAndClaimEdge(<Score>scoreItem, claimseEdge)
    //         );
    //     }

    //     const newScore = calculateScore({
    //         scoreAndClaimEdges: scoreAndClaimEdges,
    //         reversible: reversible,
    //         sourceClaimId: parentId
    //     });

    //     const oldScore = await this.repo.getScoreBySourceClaimId(newScore.sourceClaimId)
    //     if (oldScore) {
    //         if (differentScores(oldScore, newScore)) {
    //             newScore.id = oldScore.id;
    //             await this.notify([new Action(newScore, oldScore.id)]);
    //         }
    //     } else {

    //         await this.notify([new Action(newScore)]);
    //     }

    //     return newScore;
    // }

}