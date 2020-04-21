import { newId } from "../newId";
import { Item } from "./Item";
import { ItemTypes } from "..";
/**
 * Represents an intentional top of a tree of scores.
 */
export class ScoreTree implements iScoreTree, Item {
    type: ItemTypes = 'scoreTree'

    constructor(
        /** The claim to which this score belongs */
        public sourceClaimId: string,
        /** The top of the tree of scores that this belongs to. Used for indexing */
        public topScoreId: string,
        /** how confident we sould be in the claim. (AKA True) */
        public confidence: number = 1,
        public id: string = newId(),
    ) {
    }
}

export interface iScoreTree {
    /** The claim to which this score belongs */
    sourceClaimId: string,
    /** The top of the tree of scores that this belongs to. Used for indexing */
    topScoreId: string,
    /** how confident we sould be in the claim. (AKA True) */
    confidence: number,
    id: string,
    type: ItemTypes,
    /** allow for other properties by external implementations */
    // [others: string]: any;
}