import { Change } from "./dataModels/Change";
import { Repository } from "./Repository";
import { Type } from "./dataModels/Type";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { calculateScore } from "./calculateScore";
import { Score, differentScores } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";
import { Id } from "./dataModels/Id";

export class CalculationInitator {
    private repo: Repository;

    constructor(
        repo: Repository,
    ) {
        this.repo = repo;
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        this.repo.notify(changes);
        this.CalculationInitiator(changes);
    }

    private CalculationInitiator(changes: Change[]): void {
        for (const change of changes) {
            const { newItem, oldItem } = change;

            // Initiate calculations from a changed/new claim Edge
            if (newItem.type == Type.claimEdge) {
                const claimEdge = <ClaimEdge>newItem;
                const newScore = this.CalculateByClaimId(claimEdge.parentId);
                const oldScore = this.repo.getScoreBySourceClaimId(newScore.sourceClaimId)
                if (oldScore) {
                    if (differentScores(oldScore, newScore)) {
                        newScore.id = oldScore.id;
                        this.notify([new Change(newScore, oldScore)]);
                    }
                } else {
                    this.notify([new Change(newScore)]);
                }
                this.notify([new Change(newScore, oldScore)]);
            }

            // Initiate calculations from a canged/new claim
            if (newItem.type == Type.claim) {
                const claim = <Claim>newItem;
                this.notify([new Change(
                    new Score(undefined, undefined, undefined, claim.id)
                )]);
            }

            // Initiate calculations from a canged/new score
            if (newItem.type == Type.score) {
                const score = <Score>newItem;
                // Get all the claimEdges that have this score's SourceClaimId as the child and re calculate them
                const claimseEdges = this.repo.getClaimEdgesByChildId(score.sourceClaimId);
                claimseEdges.forEach(claimEdge => {
                    const newScore = this.CalculateByClaimId(claimEdge.parentId);
                    const oldScore = this.repo.getScoreBySourceClaimId(newScore.sourceClaimId)
                    if (oldScore) {
                        if (differentScores(oldScore, newScore)) {
                            newScore.id = oldScore.id;
                            this.notify([new Change(newScore, oldScore)]);
                        }
                    } else {
                        this.notify([new Change(newScore)]);
                    }
                })
            }
        }
    }


    private CalculateByClaimId(parentId: Id) {
        const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];

        //Is parent reversable?
        let reversable = false;
        const parentItem = this.repo.getItem(parentId);
        if (parentItem) {
            const parentClaim = <Claim>parentItem;
            reversable = parentClaim.reversable;
        }

        //Get all the claims for the parent to calculate the score
        const claimseEdges = this.repo.getClaimEdgesByParentId(parentId);
        claimseEdges.forEach(c => {
            scoreAndClaimEdges.push(
                new ScoreAndClaimEdge(<Score>this.repo.getScoreBySourceClaimId(c.childId), c)
            );
        });

        const newScore = calculateScore({
            scoreAndClaimEdges: scoreAndClaimEdges,
            reversable: reversable,
            sourceClaimId: parentId
        });
        
        return newScore;
    }
}