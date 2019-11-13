import { Score } from "./Score";
import { ClaimEdge } from "./ClaimEdge";
/**
 * Stores a score and it's edge in one inseparable unit to reduce future searching
 */
export declare class ScoreAndClaimEdge {
    score: Score;
    claimEdge: ClaimEdge;
    constructor(score: Score, claimEdge: ClaimEdge);
}
