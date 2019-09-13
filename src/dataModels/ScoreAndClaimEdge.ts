import { Score } from "./Score";
import { ClaimEdge } from "./ClaimEdge";
/**
 * Stores a score and it's edge in one inseparable unit to reduce future searching
 */
export class ScoreAndClaimEdge {
    constructor(
        public score: Score,
        public claimEdge: ClaimEdge,
    ) {
    }
}