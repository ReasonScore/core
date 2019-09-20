import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
 */
export declare function calculateScore(
/**An array of grouped edges and claims*/
scoreAndClaimEdges?: ScoreAndClaimEdge[], reversable?: boolean, sourceClaimId?: Id): Score;
