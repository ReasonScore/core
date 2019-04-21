import { Item } from "./Item";
import { Type } from "./Type";

/**
 * Stores the relationship between two view nodes that are children of a top claim
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it.
 */
export class View implements Item {
    type: string = Type.view
    
    constructor(
        public topClaimId: string = "",
        public claimId: string = "",
        public id: string = "",
        /** The ID for the child View this edge points from */
        /** The ID for the parent View this edge points to */
        public content: string = "",
        public scoreDisplay: string = "",
        public scoreId: string = "",
        /** This ViewEdge ID Will match the topClaimID if this is the top viewEdge */
        public version: string = "",
        public start: string = new Date().toISOString(),
        public end: string = new Date('3000-01-01').toISOString(),
    ) {
    }
}