import { Affects } from "./Affects"
import { Item } from "./Item";
import { Type } from "./Type";
import End from "./End"
/**
 * Stores the relationship between two claims in a specific scope.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
export class ClaimEdge implements Item {
    type: string = Type.claimEdge
    
    constructor(
        /** The ID for the parent claim this edge points to */
        public parentId: string = "",
        /** The ID for the child claim this edge points from */
        public childId: string = "",
        /** What claimId need to be an ancestor of this edge for this edge to be displayed or used in the calculations*/
        public scopeId: string = "",
        /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
        public affects: string = Affects.Confidence,
        /** Is the child claim a pro of it's parent (false if it is a con) */
        public pro: boolean = true,
        /** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
        public reversable: boolean = false,
        public id: string = "",
        public version: string = "",
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }
}
