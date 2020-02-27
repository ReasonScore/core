import { newId } from "../newId";
import { Affects } from "./Affects";
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 */
export class Score implements iScore {
    constructor(
        /** The claim to which this score belongs */
        public sourceClaimId: string,  //TODO: Should we change this to also be an edge so we can have a claim exist twice with the same parent?
        /** The parent of this score in the score tree graph */
        public parentScoreId: string | undefined = undefined,
        public reversible: boolean = false,
        /** Is this score a pro of it's parent (false if it is a con) */
        public pro: boolean = true,
        /** how confident we sould be in the claim. (AKA True) */
        /** How the child affects the parent score */
        public affects: Affects = "confidence",
        public confidence: number = 1,
        /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
         * A multiplier set by all the child edges that affect 'relevance'*/
        public relevance: number = 1,
        public id: string = newId(),
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

export interface iScore {
    /** The claim to which this score belongs */
    sourceClaimId: string,
    /** The parent of this score in the score tree graph */
    parentScoreId: string | undefined,
    reversible: boolean,
    /** Is this score a pro of it's parent (false if it is a con) */
    pro: boolean,
    /** how confident we sould be in the claim. (AKA True) */
    /** How the child affects the parent score */
    affects: Affects,
    /** how confident we sould be in the claim. (AKA True) */
    confidence: number,
    /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
     * A multiplier set by all the child edges that affect 'relevance'*/
    relevance: number,
    id: string,
}