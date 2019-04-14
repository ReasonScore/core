import { Score } from "./Score";
import { Edge } from "./Edge";
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the children and scores into this array that are within scope.
 * @param childEdges an array of edges (aka arguments) that link an individual child to the claim this score is for.
 * @param childScores an array of scores for child claims linked to the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the scores into this array that are within scope.
 * @param previousScore The previous score for this claim which may be replaced by this new score (if there are different)
 */
export declare function calculateScore(claimId: string, childEdges?: Edge[], childScores?: Score[]): Score;
