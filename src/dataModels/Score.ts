import { Affects } from "./Affects"
import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId2";
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
        public version: Id = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }
}

/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */
export function differentScores(scoreA: Score, scoreB: Score) {
    return !(
        scoreA.confidence == scoreB.confidence
        && scoreA.relevance == scoreB.relevance
    )
}