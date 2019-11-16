import { Change } from "./dataModels/Change";
import { Repository } from "./Repository";
import { Type } from "./dataModels/Type";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { calculateScore } from "./calculateScore";
import { Score, differentScores } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";
import { Id } from "./dataModels/Id";
import { iRepository } from "./dataModels/iRepository";

export class CalculationInitator {

    constructor(
        public repo: iRepository,
        public subscriber: ((changes: Change[]) => void) | undefined = undefined
    ) {
    }

    /** this function can be called by outside code to notfy this repository of changes */
    async notify(changes: Change[]) {
        await this.repo.notify(changes);
        if (this.subscriber) {
            this.subscriber(changes);
        }
        await this.CalculationInitiator(changes);
    }

    private async CalculationInitiator(changes: Change[]) {
        for (const change of changes) {
            const { newItem, oldItem } = change;

            // Initiate calculations from a changed/new claim Edge
            if (newItem.type == Type.claimEdge) {
                const claimEdge = newItem as ClaimEdge;
                await this.CalculateByClaimId(claimEdge.parentId);
            }

            // Initiate calculations from a canged/new claim
            if (newItem.type == Type.claim) {
                const claim = <Claim>newItem;
                await this.CalculateByClaimId(claim.id);
            }

            // Initiate calculations from a canged/new score
            if (newItem.type == Type.score) {
                const score = <Score>newItem;
                // Get all the claimEdges that have this score's SourceClaimId as the child and re calculate them
                const claimseEdges = await this.repo.getClaimEdgesByChildId(score.sourceClaimId);
                claimseEdges.forEach(async claimEdge => {
                    await this.CalculateByClaimId(claimEdge.parentId);
                })
            }
        }
    }

    private async CalculateByClaimId(parentId: Id) {
        const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];
debugger
        //Is parent reversible?
        let reversible = false;
        const parentItem = await this.repo.getItem(parentId);
        if (parentItem) {
            const parentClaim = <Claim>parentItem;
            reversible = parentClaim.reversible;
        }

        //Get all the claims for the parent to calculate the score
        const claimseEdges = await this.repo.getClaimEdgesByParentId(parentId);
        claimseEdges.forEach(async c => {
            scoreAndClaimEdges.push(
                new ScoreAndClaimEdge(<Score>await this.repo.getScoreBySourceClaimId(c.childId), c)
            );
        });

        const newScore = calculateScore({
            scoreAndClaimEdges: scoreAndClaimEdges,
            reversible: reversible,
            sourceClaimId: parentId
        });

        const oldScore = await this.repo.getScoreBySourceClaimId(newScore.sourceClaimId)
        if (oldScore) {
            if (differentScores(oldScore, newScore)) {
                newScore.id = oldScore.id;
                await this.notify([new Change(newScore, oldScore)]);
            }
        } else {
            await this.notify([new Change(newScore)]);
        }
    }

}