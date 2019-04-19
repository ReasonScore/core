import { Affects } from "./Affects"
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
export class Score {
    constructor(
        /** This is how the child claim affects the parent claim's score */
        public affects: Affects = Affects.Confidence,
        /** Can the confidence score go below 0 */
        public reversable: boolean = false,
        /** how confident we sould be in the claim. (AKA True) */
        public confidence: number = 1,
        /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
         * A multiplier set by all the child edges that affect 'relevance'*/
        public relevance: number = 1,
    ) {
    }

}