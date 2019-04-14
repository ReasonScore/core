/**
 * Stores the relationship between two claims in a specific scope. This is directional as the edge points from one claim to another. This is just a adata transfer object so it should have no logic in it.
 * @property {string} parentId - The ID for the parent claim.
 * @property {string} childId - The ID for the parent claim.
 * @property {string} scopeId - The ID for the scope claim. A scope claim must be an ancestor in this relationship for this child to affect it's parent at all.
 * @property {Affects} affects - How the child affects the parent.
 */
export declare class Edge {
    parentId: string;
    childId: string;
    affects: Affects;
    pro: boolean;
    reversable: boolean;
    scopeId: string;
    constructor(parentId: string, childId: string, affects: Affects, pro?: boolean, reversable?: boolean, scopeId?: string);
}
/**
 * How a child claim affects a parent claim
 * @property {Affects} affects - How the child affects the parent.
 */
export declare enum Affects {
    Confidence = "confidence",
    Relevance = "relevance"
}
