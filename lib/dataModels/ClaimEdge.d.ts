import { Affects } from "./Affects";
import { ItemTypes } from "./ItemTypes";
/**
 * Stores the relationship between a claim and an item (usually another claim).
 * This is directional as the edge points from one claim to it's parent.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
export declare class ClaimEdge {
    /** The ID for the parent claim this edge points to */
    parentId: string;
    /** The ID for the child claim this edge points from */
    childId: string;
    /** How the child affects the parent score */
    affects: Affects;
    /** Is the child claim a pro of it's parent (false if it is a con) */
    pro: boolean;
    id: string;
    priority: string;
    type: ItemTypes;
    constructor(
    /** The ID for the parent claim this edge points to */
    parentId: string, 
    /** The ID for the child claim this edge points from */
    childId: string, 
    /** How the child affects the parent score */
    affects?: Affects, 
    /** Is the child claim a pro of it's parent (false if it is a con) */
    pro?: boolean, id?: string, priority?: string);
}
export interface iClaimEdge {
    type: ItemTypes;
    /** The ID for the parent claim this edge points to */
    parentId: string;
    /** The ID for the child claim this edge points from */
    childId: string;
    /** How the child affects the parent score */
    affects: Affects;
    /** Is the child claim a pro of it's parent (false if it is a con) */
    pro: boolean;
    id: string;
}
