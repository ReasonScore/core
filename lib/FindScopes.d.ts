import { Score } from "./dataModels/Score";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
export interface ScoresByScope {
    [Id: string]: Score[];
}
export interface ScoreAndClaimEdgesByScoreScopeId {
    [Id: string]: ScoreAndClaimEdge[];
}
export declare function FindScopes(scoreAndClaimEdges: ScoreAndClaimEdge[]): ScoreAndClaimEdgesByScoreScopeId;
