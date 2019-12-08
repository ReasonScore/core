import { Action, Claim, ClaimEdge, Score } from "..";

export interface Index { [searchIndex: string]: string; } //Store the string for the ID
export interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export interface iRsData {
    // Claim data
    /** Stores all the changes for both the claims and claim edges */
    claimsLog: Action[][],
    /** Stores all the current claims */
    claims: { [idString: string]: Claim; },
    /** Stores all the current claim edges */
    claimEdges: { [idString: string]: ClaimEdge; },

    // Claim Indexes - Local
    claimEdgeIdsByParentId: IndexArray,
    claimEdgeIdsByChildId: IndexArray,

    // Score Data - Local
    /** Stores all the changes for the scores */
    scoresLog: Action[][],
    scores: { [idString: string]: Score; },
    //Score Indexes - Local
    scoreIdsByClaimId: IndexArray,
    childIdsByScoreId: IndexArray,
}

export class RsData implements iRsData {
    constructor(
        // Claim data
        /** Stores all the changes for both the claims and claim edges */
        public claimsLog: Action[][] = [],
        /** Stores all the current claims */
        public claims: { [idString: string]: Claim; } = {},
        /** Stores all the current claim edges */
        public claimEdges: { [idString: string]: ClaimEdge; } = {},

        // Claim Indexes - Local
        public claimEdgeIdsByParentId: IndexArray = {},
        public claimEdgeIdsByChildId: IndexArray = {},

        // Score Data - Local
        /** Stores all the changes for the scores */
        public scoresLog: Action[][] = [],
        public scores: { [idString: string]: Score; } = {},
        //Score Indexes - Local
        public scoreIdsByClaimId: IndexArray = {},
        public childIdsByScoreId: IndexArray = {},
    ) {
    }
}