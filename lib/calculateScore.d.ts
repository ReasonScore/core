import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
 * This function does not take into account scopes.
 * The caller of this fuction should only put the children and scores into this array that are within scope.
 */
export declare function calculateScore(
/**An array of grouped edges and claims*/
scoreAndClaimEdges?: ScoreAndClaimEdge[], reversable?: boolean, sourceClaimId?: Id): Score;
