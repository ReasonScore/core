import { Score } from "./dataModels/Score";
import { Id, ID } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";

export interface ScoresByScope { [Id: string]: Score[] }

export function groupScoresByScopes(scoreAndClaimEdges: ScoreAndClaimEdge[], baseScope: Id): ScoresByScope {
    const scoresByScope: ScoresByScope = {};
    const baseScores: Score[] = scoresByScope[baseScope.toString()] = [];

    scoreAndClaimEdges.forEach((claimEdgeScore) => {
        const score = claimEdgeScore.score;
        const claimEdge = claimEdgeScore.claimEdge;

        if (
            (score.scopeId == score.id || score.scopeId == baseScope)
            && claimEdge.scopeId == baseScope
        ) {
            baseScores.push(score);
        } else if (
            (score.scopeId == score.id || score.scopeId == baseScope)
            && claimEdge.scopeId != baseScope
        ) {
            let edgeScopeScores = scoresByScope[claimEdge.scopeId.toString()];
            if (!edgeScopeScores){
                edgeScopeScores = scoresByScope[claimEdge.scopeId.toString()] = [];
            }
            edgeScopeScores.push(score);
        } else {
            throw "Cannot determine which scope to put the score into";
        }
    });

    return scoresByScope;
}

