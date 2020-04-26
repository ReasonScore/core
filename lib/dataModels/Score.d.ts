import { Affects } from "./Affects";
import { Item } from "./Item";
import { ItemTypes } from "..";
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 */
export declare class Score implements Item {
    /** The claim to which this score belongs */
    sourceClaimId: string;
    /** The top of the tree of scores that this belongs to. Used for indexing */
    scoreTreeId: string;
    /** The parent of this score in the score tree graph */
    parentScoreId: string | undefined;
    /** The Edge to which this score belongs */
    sourceEdgeId: string | undefined;
    reversible: boolean;
    /** Is this score a pro of it's parent (false if it is a con) */
    pro: boolean;
    /** how confident we sould be in the claim. (AKA True) */
    /** How the child affects the parent score */
    affects: Affects;
    confidence: number;
    /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
     * A multiplier set by all the child edges that affect 'relevance'*/
    relevance: number;
    id: string;
    priority: string;
    content: string;
    type: ItemTypes;
    constructor(
    /** The claim to which this score belongs */
    sourceClaimId: string, 
    /** The top of the tree of scores that this belongs to. Used for indexing */
    scoreTreeId: string, 
    /** The parent of this score in the score tree graph */
    parentScoreId?: string | undefined, 
    /** The Edge to which this score belongs */
    sourceEdgeId?: string | undefined, reversible?: boolean, 
    /** Is this score a pro of it's parent (false if it is a con) */
    pro?: boolean, 
    /** how confident we sould be in the claim. (AKA True) */
    /** How the child affects the parent score */
    affects?: Affects, confidence?: number, 
    /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
     * A multiplier set by all the child edges that affect 'relevance'*/
    relevance?: number, id?: string, priority?: string, content?: string);
    descendantCount: number;
    generation: number;
    /** What fraction of tree is this disregarding all scores */
    fractionSimple: number;
    /** What fraction of mainScore is this score and it's descendants responsible for */
    fraction: number;
    childrenAveragingWeight: number;
    childrenConfidenceWeight: number;
    childrenRelevanceWeight: number;
    childrenWeight: number;
    weight: number;
    percentOfWeight: number;
    cancelledFraction: number;
}
