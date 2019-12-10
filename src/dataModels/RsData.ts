import { iAction, iClaim, iClaimEdge, iScore } from "..";

export interface Index { [searchIndex: string]: string; } //Store the string for the ID
export interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export interface iRsData {
    /** Stores all the actions sent through */
    actionsLog: iAction[][],
    // Claim data
    /** Stores all the current claims */
    claims: { [idString: string]: iClaim; },
    /** Stores all the current claim edges */
    claimEdges: { [idString: string]: iClaimEdge; },

    // Claim Indexes - Local
    claimEdgeIdsByParentId: IndexArray,
    claimEdgeIdsByChildId: IndexArray,

    // Score Data - Local
    scores: { [idString: string]: iScore; },
    //Score Indexes - Local
    scoreIdsByClaimId: IndexArray,
    childIdsByScoreId: IndexArray,
}

export class RsData implements iRsData {
    constructor(
        public actionsLog: iAction[][] = [],
        // Claim data
        /** Stores all the current claims */
        public claims: { [idString: string]: iClaim; } = {},
        /** Stores all the current claim edges */
        public claimEdges: { [idString: string]: iClaimEdge; } = {},

        // Claim Indexes - Local
        public claimEdgeIdsByParentId: IndexArray = {},
        public claimEdgeIdsByChildId: IndexArray = {},

        // Score Data - Local
        public scores: { [idString: string]: iScore; } = {},
        //Score Indexes - Local
        public scoreIdsByClaimId: IndexArray = {},
        public childIdsByScoreId: IndexArray = {},
    ) {
    }
}