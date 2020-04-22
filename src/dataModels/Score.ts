import { newId } from "../newId";
import { Affects } from "./Affects";
import { Item } from "./Item";
import { ItemTypes } from "..";
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 */
export class Score implements iScore, iScoreFragment, Item {
    type: ItemTypes = 'score'

    constructor(
        /** The claim to which this score belongs */
        public sourceClaimId: string,
        /** The top of the tree of scores that this belongs to. Used for indexing */
        public scoreTreeId: string,
        /** The parent of this score in the score tree graph */
        public parentScoreId: string | undefined = undefined,
        /** The Edge to which this score belongs */
        public sourceEdgeId: string | undefined = undefined,

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
        public priority: string = "",
        public content: string = "",
        /** What fraction of tree is this score and it's descendants responsible for */
        public fraction: number = 1,
        public descendantCount: number = 0,
    ) {
    }

    public childrenAveragingWeight: number = 1;
    public childrenConfidenceWeight: number = 1;
    public childrenRelevanceWeight: number = 1;
    public childrenWeight: number = 1;
    public weight: number = 1;
    public percentOfWeight: number = 1;
}

/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */
export function differentScores(scoreA: iScore, scoreB: iScore) {

    return !(
        JSON.stringify(scoreA, Object.keys(scoreA).sort()) ===
        JSON.stringify(scoreB, Object.keys(scoreB).sort())
    )
}

export interface iScore {
    /** The claim to which this score belongs */
    sourceClaimId: string,
    /** The Edge to which this score belongs */
    sourceEdgeId?: string,
    /** The top of the tree of scores that this belongs to. Used for indexing */
    scoreTreeId: string,
    /** The parent of this score in the score tree graph */
    parentScoreId?: string,
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
    type: ItemTypes,
    priority: string,
    content: string,

    /** What fraction of tree is this score and it's descendants responsible for */
    fraction: number, // TODO: Consider moving outside the standard score. Is this a rare case?
    descendantCount: number, // TODO: Consider moving outside the standard score. Is this a rare case?

    /** allow for other properties by external implementations */
    // [others: string]: any;

    childrenAveragingWeight: number,
    childrenConfidenceWeight: number,
    childrenRelevanceWeight: number,
    childrenWeight: number;
    weight: number,
    percentOfWeight: number,
}

export interface iScoreFragment {
    reversible?: boolean,
    /** Is this score a pro of it's parent (false if it is a con) */
    pro?: boolean,
    /** How the child affects the parent score */
    affects?: Affects,
    /** how confident we sould be in the claim. (AKA True) */
    confidence?: number,
    /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
     * A multiplier set by all the child edges that affect 'relevance'*/
    relevance?: number,
    priority?: string,
    /** What fraction of tree is this score and it's descendants responsible for */
    fraction?: number,
    descendantCount?: number,
    /** allow for other properties by external implementations */
    // [others: string]: any;

    childrenAveragingWeight?: number,
    childrenConfidenceWeight?: number,
    childrenRelevanceWeight?: number,
    childrenWeight?: number;
    weight?: number,
    percentOfWeight?: number,
}