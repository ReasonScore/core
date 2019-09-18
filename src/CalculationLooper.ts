import { Change } from "./dataModels/Change";
import { Repository } from "./Repository";
import { Messenger } from "./messenger";
import { Type } from "./dataModels/Type";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import { FindScopes } from "./FindScopes";
import { ID } from "./dataModels/Id";
import { calculateScore } from "./calculateScore";
import { Score } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";

export class CalculationLooper {
    private messenger?: Messenger;
    private repo: Repository;

    constructor(
        repo: Repository,
        messenger?: Messenger,
    ) {
        this.repo = repo;
        if (messenger) {
            this.messenger = messenger;
        }
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        this.repo.notify(changes);
        this.calcLoop(changes);
    }

    private calcLoop(changes: Change[]): void {
        for (const change of changes) {
            if (change.newItem.type == Type.claimEdge) {
                this.calculateFromClaimEdge(<ClaimEdge>change.newItem)
            }

            if (change.newItem.type == Type.claim) {
                const claim = <Claim>change.newItem;
                this.repo.notify([new Change(new Score(undefined, undefined, undefined, claim.id, claim.id))]);
            }
        }
    }

    private calculateFromClaimEdge(sourceClaimEdge: ClaimEdge) {
        const claimEdges = this.repo.getClaimEdgesByParentId(sourceClaimEdge.parentId);
        const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];

        claimEdges.forEach((claimEdge) => {
            let claimEdgeScores = this.repo.getScoresByClaimId(claimEdge.childId);
            claimEdgeScores.forEach((score) => {
                scoreAndClaimEdges.push(
                    new ScoreAndClaimEdge(score, claimEdge)
                );
            });
        });

        const scoreAndClaimEdgesByScoreScopeIds = FindScopes(scoreAndClaimEdges);

        //Check each Scope and ClaimEdge and create any missing scores
        Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(([scopeIdString]) => {
            claimEdges.forEach((claimEdge) => {
                if (scoreAndClaimEdgesByScoreScopeIds[scopeIdString].find(
                    sce => sce.claimEdge == claimEdge) == undefined) {
                    //Look for already existing scores
                    const foundScore = this.repo.getScoreByClaimIdAndScope(claimEdge.childId, ID(scopeIdString))
                    scoreAndClaimEdgesByScoreScopeIds[scopeIdString].push(
                        new ScoreAndClaimEdge(foundScore, claimEdge)
                    )
                }
            });
        });

        //For each scope, loop through and create a score
        Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(([scopeIdString, scoreAndClaimEdges]) => {
            const newScore = calculateScore(scoreAndClaimEdges);
            newScore.scopeId = ID(scopeIdString);
            newScore.sourceClaimId = scoreAndClaimEdges[0].claimEdge.parentId; //ToDo: Is there a better way to get this?
            const oldScore = this.repo.getScoreByClaimIdAndScope(newScore.sourceClaimId, newScore.scopeId)
            debugger;
            if (oldScore) {
                newScore.id = oldScore.id;
            }
            this.repo.notify([new Change(newScore)]);
        });

        //If there are no edges below it then create a base score
        if (claimEdges.length === 0) {
            this.repo.notify([new Change(
                new Score(undefined, undefined, undefined, sourceClaimEdge.parentId, sourceClaimEdge.scopeId)
            )]);

        }


    }
}