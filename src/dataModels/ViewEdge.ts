import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId";
import End from "./End";

/**
 * Stores the relationship between two view nodes that are children of a top claim
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it.
 */
export class ViewEdge implements Item {
    type: string = Type.viewEdge
    
    constructor(
        public topClaimId: string = "",
        /** The ID for the parent View this edge points to */
        public parentId: string = "",
        /** The ID for the child View this edge points from */
        public childId: string = "",
        public claimEdgeID: string = "",
        /** This ViewEdge ID Will match the topClaimID if this is the top viewEdge */
        public id: string = newId(),
        public version: string = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }
}