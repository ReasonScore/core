import { Affects } from "./Affects"
import { Item } from "./Item";
import { Type } from "./Type";
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
export class Score implements Item {
    type: Type = Type.score
    
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
        public id: string = "",
        public version: string = "",
        public start: Date = new Date(),
        public end: Date = new Date('3000-01-01'),
    ) {
    }

}