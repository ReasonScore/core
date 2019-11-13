import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
 */
export declare function calculateScore({ scoreAndClaimEdges, reversible, sourceClaimId }?: {
    /** An array of grouped edges and claims*/
    scoreAndClaimEdges?: ScoreAndClaimEdge[];
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversible?: boolean;
    /** The ID of the claim we are creating a score for */
    sourceClaimId?: Id;
}): Score;
