import { Affects } from "./Affects"
import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId";
import End from "./End";
import { Id } from "./Id";
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
export class Score implements Item {
    type: Type = Type.score
    
    constructor(
        /** how confident we sould be in the claim. (AKA True) */
        public confidence: number = 1,
        /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
         * A multiplier set by all the child edges that affect 'relevance'*/
        public relevance: number = 1,
        public id: Id = newId(),
        /** The claim to which this score belongs */
        public sourceClaimId: Id = newId(),
        /** If this claim is resticted to a scope this will be the ID of the scope */
        public scopeId?: Id,
        /** This is how the child claim affects the parent claim's score */
        public affects: string = Affects.Confidence,
        /** Can the confidence score go below 0 */
        public reversable: boolean = false,
        public version: Id = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }

}