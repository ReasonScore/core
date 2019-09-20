import { Item } from "./Item";
import { Type } from "./Type";
import { Id } from "./Id";
/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
export declare class Score implements Item {
    /** how confident we sould be in the claim. (AKA True) */
    confidence: number;
    /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
     * A multiplier set by all the child edges that affect 'relevance'*/
    relevance: number;
    id: Id;
    /** The claim to which this score belongs */
    sourceClaimId: Id;
    version: Id;
    start: string;
    end: string;
    type: Type;
    constructor(
    /** how confident we sould be in the claim. (AKA True) */
    confidence?: number, 
    /** How relevent this claim is to it's parent claim. Ranges from 0 to infinity.
     * A multiplier set by all the child edges that affect 'relevance'*/
    relevance?: number, id?: Id, 
    /** The claim to which this score belongs */
    sourceClaimId?: Id, version?: Id, start?: string, end?: string);
}
