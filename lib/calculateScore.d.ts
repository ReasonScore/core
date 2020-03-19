import { iScore, iScoreFragment } from "./dataModels/Score";
export interface iCalculateScore {
    ({ childScores, reversible }: {
        /** An array of grouped edges and claims*/
        childScores?: iScore[];
        /** Can this score fall below a 0 confidence (have a negative confidence) */
        reversible?: boolean;
    }): iScoreFragment;
}
/**
 * Calculates a new score based on the child scores passed in.
 */
export declare function calculateScore({ childScores, reversible }?: {
    /** An array of grouped edges and claims*/
    childScores?: iScore[];
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversible?: boolean;
}): iScoreFragment;
