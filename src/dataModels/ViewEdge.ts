import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId";
import End from "./End";
import { Id, ID } from "./Id";

/**
 * Stores the relationship between two view nodes that are children of a top claim
 * This is directional as the edge points from one claim to another.
 * This is just a data transfer object so it should have no logic in it.
 */
export class ViewEdge implements Item {
    type: Type = Type.viewEdge
    
    constructor(
        public topClaimId: Id = ID(""),
        /** The ID for the parent View this edge points to */
        public parentId: Id = ID(""),
        /** The ID for the child View this edge points from */
        public childId: Id = ID(""),
        public claimEdgeID: Id = ID(""),
        /** This ViewEdge ID Will match the topClaimID if this is the top viewEdge */
        public id: Id = newId(),
        public version: Id = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }
}