import { Repository } from "./Repository";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
import { FindScopes } from "./FindScopes";
import { calculateScore } from "./calculateScore";
import { ID, Id } from "./dataModels/Id";
import { Score } from "./dataModels/Score";
import { Change } from "./dataModels/Change";

export function scoreDescendants(repo: Repository, parentId: Id, ScopeId?: Id): void {
    const claimEdges = repo.getClaimEdgesByParentId(parentId);
    const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];

    claimEdges.forEach((claimEdge) => {
        let claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
        // If none of the scores exist then we need to generate them
        if (claimEdgeScores.length == 0) {
            scoreDescendants(repo, claimEdge.childId, claimEdge.scopeId)
            claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
        }
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
                const foundScore = repo.getScorebyClaimIdAndScope(claimEdge.childId, ID(scopeIdString))
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
        repo.notify([new Change(newScore)]);
    });

    //If there are no edges below it then create a base score
    if (claimEdges.length === 0) {
        repo.notify([new Change(
            new Score(undefined, undefined, undefined, parentId, ScopeId)
        )]);

    }

}