import { Item } from "./Item";
import { Type } from "./Type";
import { Id } from "./Id";
/**
 * Stores the relationship between two view nodes that are children of a top claim
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it.
 */
export declare class View implements Item {
    topClaimId: Id;
    claimId: Id;
    id: Id;
    /** The ID for the child View this edge points from */
    /** The ID for the parent View this edge points to */
    content: string;
    scoreDisplay: string;
    scoreId: Id;
    /** This ViewEdge ID Will match the topClaimID if this is the top viewEdge */
    version: Id;
    start: string;
    end: string;
    type: Type;
    constructor(topClaimId?: Id, claimId?: Id, id?: Id, 
    /** The ID for the child View this edge points from */
    /** The ID for the parent View this edge points to */
    content?: string, scoreDisplay?: string, scoreId?: Id, 
    /** This ViewEdge ID Will match the topClaimID if this is the top viewEdge */
    version?: Id, start?: string, end?: string);
}
