import { Item } from "./Item";
import { Type } from "./Type";

/**
 * Stores the relationship between two view nodes that are children of a top claim
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it.
 */
export class ViewEdge implements Item {
    type: Type = Type.viewEdge
    
    constructor(
        public topClaimId: string = "",
        /** The ID for the parent View this edge points to */
        public parentId: string = "",
        /** The ID for the child View this edge points from */
        public childId: string = "",
        /** This ViewEdge ID Will match the topClaimID if this is the top viewEdge */
        public id: string = "",
        public version: string = "",
        public start: Date = new Date(),
        public end: Date = new Date('3000-01-01'),
    ) {
    }
}