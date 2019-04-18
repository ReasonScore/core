import { Affects } from "./Affects"
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
export class Score {
    constructor(
        public affects: Affects = Affects.Confidence,
        public reversable: boolean = false,
        public score: number = 1,
        /** How relevent this claim is to it's parent claim. Calculation: Pro: 1 + childScore.score, con: 1 - (childScore.score / 2). A multiplier set by all the child edges that affect 'relevance'. A multiplier set by all the child edges that affect 'relevance'. This is usually set during the calculation of it's parent score. */
        public relevance: number = 1,
    ) {
    }

}