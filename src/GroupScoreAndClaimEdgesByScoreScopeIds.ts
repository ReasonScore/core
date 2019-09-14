import { Score } from "./dataModels/Score";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";


export interface ScoresByScope { [Id: string]: Score[] }//  | undefined }

export interface ScoreAndClaimEdgesByScoreScopeId { [Id: string]: ScoreAndClaimEdge[] }//  | undefined }

export function GroupScoreAndClaimEdgesByScoreScopeIds(scoreAndClaimEdges: ScoreAndClaimEdge[]): ScoreAndClaimEdgesByScoreScopeId {
    const scoreAndClaimEdgesByScoreScopeIds: ScoreAndClaimEdgesByScoreScopeId = {};
    scoreAndClaimEdges.forEach((claimEdgeScore) => {
        const score = claimEdgeScore.score;
        let idString: string;
        if (
            score.scopeId != undefined
            && score.scopeId != score.sourceClaimId //If the scope ID is the same then that score ID it should not propogate up the hierarchy any further.
        ) {
            idString = score.scopeId.toString();
        }
        else {
            idString = claimEdgeScore.claimEdge.parentId.toString();
        }
        if (scoreAndClaimEdgesByScoreScopeIds[idString] === undefined) {
            scoreAndClaimEdgesByScoreScopeIds[idString] = [];
        }
    });
    return scoreAndClaimEdgesByScoreScopeIds;

}