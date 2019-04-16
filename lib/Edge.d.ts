/**
 * Stores the relationship between two claims in a specific scope. This is directional as the edge points from one claim to another. This is just a adata transfer object so it should have no logic in it.
 */
export declare class Edge {
    /** The ID for the parent claim this edge points to */
    parentId: string;
    /** The ID for the child claim this edge points from */
    childId: string;
    /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
    affects: Affects;
    pro: boolean;
    reversable: boolean;
    scopeId: string;
    constructor(
    /** The ID for the parent claim this edge points to */
    parentId?: string, 
    /** The ID for the child claim this edge points from */
    childId?: string, 
    /** How the child affects the parent. Often what math is done with when using this edge in generating the score */
    affects?: Affects, pro?: boolean, reversable?: boolean, scopeId?: string);
}
/**
 * How a child claim affects a parent claim
 */
export declare enum Affects {
    Confidence = "confidence",
    Relevance = "relevance"
}
