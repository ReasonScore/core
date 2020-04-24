import { Score } from "./dataModels/Score";
export interface iCalculateScore {
    ({ childScores }: {
        /** An array of grouped edges and claims*/
        childScores?: Score[];
    }): Partial<Score>;
}
/**
 * Calculates a new score based on the child scores passed in.
 */
export declare function calculateScore({ childScores, reversible }?: {
    /** An array of grouped edges and claims*/
    childScores?: Score[];
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversible?: boolean;
}): Partial<Score>;
