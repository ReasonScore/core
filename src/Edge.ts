import { Affects } from "./Affects"
/**
 * Stores the relationship between two claims in a specific scope. This is directional as the edge points from one claim to another. This is just a adata transfer object so it should have no logic in it.
 */
export class Edge {
    constructor(
        /** The ID for the parent claim this edge points to */
        public parentId: string = "",
        /** The ID for the child claim this edge points from */
        public childId: string = "",
        /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
        public affects: Affects = Affects.Confidence,
        public pro: boolean = true,
        public reversable: boolean = false,
        public scopeId: string = "",
    ) {
    }
}
