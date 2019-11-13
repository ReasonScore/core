import { Affects } from "./Affects";
import { Item } from "./Item";
import { Type } from "./Type";
import { Id } from "./Id";
/**
 * Stores the relationship between two claims.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
export declare class ClaimEdge implements Item {
    /** The ID for the parent claim this edge points to */
    parentId: Id;
    /** The ID for the child claim this edge points from */
    childId: Id;
    /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
    affects: Affects;
    /** Is the child claim a pro of it's parent (false if it is a con) */
    pro: boolean;
    id: Id;
    version: Id;
    start: string;
    end: string;
    type: Type;
    constructor(
    /** The ID for the parent claim this edge points to */
    parentId?: Id, 
    /** The ID for the child claim this edge points from */
    childId?: Id, 
    /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
    affects?: Affects, 
    /** Is the child claim a pro of it's parent (false if it is a con) */
    pro?: boolean, id?: Id, version?: Id, start?: string, end?: string);
}
/** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
