import { iScore } from "./Score";
import { ClaimEdge } from "./ClaimEdge";
/**
 * Stores a score and it's edge in one inseparable unit to reduce future searching
 */
export declare class ScoreAndClaimEdge {
    score: iScore;
    claimEdge: ClaimEdge;
    constructor(score: iScore, claimEdge: ClaimEdge);
}
