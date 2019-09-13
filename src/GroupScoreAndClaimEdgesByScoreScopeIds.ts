import { Score } from "./dataModels/Score";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";


export interface ScoresByScope { [Id: string]: Score[] }//  | undefined }

export interface ScoreAndClaimEdgesByScoreScopeId { [Id: string]: ScoreAndClaimEdge[] }//  | undefined }

export function GroupScoreAndClaimEdgesByScoreScopeIds(scoreAndClaimEdges: ScoreAndClaimEdge[]) : ScoreAndClaimEdgesByScoreScopeId {
    const scoreAndClaimEdgesByScoreScopeIds: ScoreAndClaimEdgesByScoreScopeId = {};
    scoreAndClaimEdges.forEach((claimEdgeScore) => {
        let idString: string;
        if (claimEdgeScore.score.scopeId != undefined) {
            idString = claimEdgeScore.score.scopeId.toString();
        }
        else {
            idString = claimEdgeScore.claimEdge.parentId.toString();
        }
        if (scoreAndClaimEdgesByScoreScopeIds[idString] === undefined) {
            scoreAndClaimEdgesByScoreScopeIds[idString] = [];
        }
        //Only add it to the list of scores if the Scope is not the same as the child ID.
        //If the scope ID is the same then that score ID it should not propogate up the hierarchy any further.
        if (claimEdgeScore.score.id.toString() != idString) {
            scoreAndClaimEdgesByScoreScopeIds[idString].push(
                new ScoreAndClaimEdge(claimEdgeScore.score, claimEdgeScore.claimEdge)
            );
        }

    });
    return scoreAndClaimEdgesByScoreScopeIds;

}