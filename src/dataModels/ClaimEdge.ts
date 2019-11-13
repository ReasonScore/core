import { Affects } from "./Affects"
import { Item } from "./Item";
import { Type } from "./Type";
import End from "./End"
import { newId } from "../newId";
import { Id, ID } from "./Id";
/**
 * Stores the relationship between two claims.
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
export class ClaimEdge implements Item {
    type: Type = Type.claimEdge
    
    constructor(
        /** The ID for the parent claim this edge points to */
        public parentId: Id = ID(""),
        /** The ID for the child claim this edge points from */
        public childId: Id = ID(""),
        /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
        public affects: Affects = Affects.Confidence,
        /** Is the child claim a pro of it's parent (false if it is a con) */
        public pro: boolean = true,
        public id: Id = newId(),
        public version: Id = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }
}

        /** Can the score for this edge fall below a 0 confidence (have a negative confidence) */
        //public reversible: boolean = false,
