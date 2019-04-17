/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
export class Score {
    /** How relevent this claim is to it's parent claim. Calculation: Pro: 1 + childScore.score, con: 1 - (childScore.score / 2). A multiplier set by all the child edges that affect 'relevance'. A multiplier set by all the child edges that affect 'relevance'. This is usually set during the calculation of it's parent score. */
    relevance: number = 1;
    /** The total summed strength of all the children scores. */
    childrenStrength: number = 0;
    /** The total summed weight of all the children scores */
    childrenWeight: number = 0;
    /** The final weight of this claim on it's parent. Calculation: score * relvance. This is usually set during the calculation of it's parent score. */
    weight: number = 1;
    /** The final strength of this claim on it's parent. Calculation: childScore.weight * +/-childScore.score. This is usually set during the calculation of it's parent score. */
    strength: number = 1;
    /** The score displayed in a short text. rounded to whole % for confidence or a multiplier or division for relevance.*/
    displayText: string = "";

    constructor(
        /**The ID of the claim this score is based on */
        public claimId: string,
        /** The final score calculated for this claim in this scope. calculation: strengthTotal / weightTotal. This is usually set during the calculation of it's parent score. */
        public score: number = 1,
    ) {
    }

}