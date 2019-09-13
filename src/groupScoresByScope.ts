import { Score } from "./dataModels/Score";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";


export interface ScoresByScope { [Id: string]: Score[] }//  | undefined }

export interface ScoreAndClaimEdgesByScoreScopeId { [Id: string]: ScoreAndClaimEdge[] }//  | undefined }

export function groupScoresByScope(scores: Score[], parentId: string, ScoresByScope: ScoresByScope) {
    scores.forEach(score => {
        let idString: string;
        if (score.scopeId != undefined) {
            idString = score.scopeId.toString();
        }
        else {
            idString = parentId;
        }
        if (ScoresByScope[idString] === undefined) {
            ScoresByScope[idString] = [];
        }
        //Only add it to the list of scores if the Scope is not the same as the child ID.
        //If the scope ID is the same then that score ID it should not propogate up the hierarchy any further.
        if (score.id.toString() != idString){
            ScoresByScope[idString].push(score);
        }
    });
}