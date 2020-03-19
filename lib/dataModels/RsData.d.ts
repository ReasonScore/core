import { iAction, iClaim, iClaimEdge, iScore } from "..";
export interface Index {
    [searchIndex: string]: string;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export interface iRsData {
    /** Stores all the actions sent through */
    actionsLog: iAction[][];
    /** Stores all the current claims */
    claims: {
        [idString: string]: iClaim;
    };
    /** Stores all the current claim edges */
    claimEdges: {
        [idString: string]: iClaimEdge;
    };
    claimEdgeIdsByParentId: IndexArray;
    claimEdgeIdsByChildId: IndexArray;
    scores: {
        [idString: string]: iScore;
    };
    scoreIdsByClaimId: IndexArray;
    childIdsByScoreId: IndexArray;
}
export declare class RsData implements iRsData {
    actionsLog: iAction[][];
    /** Stores all the current claims */
    claims: {
        [idString: string]: iClaim;
    };
    /** Stores all the current claim edges */
    claimEdges: {
        [idString: string]: iClaimEdge;
    };
    claimEdgeIdsByParentId: IndexArray;
    claimEdgeIdsByChildId: IndexArray;
    scores: {
        [idString: string]: iScore;
    };
    scoreIdsByClaimId: IndexArray;
    childIdsByScoreId: IndexArray;
    constructor(actionsLog?: iAction[][], 
    /** Stores all the current claims */
    claims?: {
        [idString: string]: iClaim;
    }, 
    /** Stores all the current claim edges */
    claimEdges?: {
        [idString: string]: iClaimEdge;
    }, claimEdgeIdsByParentId?: IndexArray, claimEdgeIdsByChildId?: IndexArray, scores?: {
        [idString: string]: iScore;
    }, scoreIdsByClaimId?: IndexArray, childIdsByScoreId?: IndexArray);
}
