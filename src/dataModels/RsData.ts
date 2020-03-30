import { iAction, Item } from "..";

export interface Index { [searchIndex: string]: string; } //Store the string for the ID
export interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export interface iRsData {
    /** Stores all the actions sent through */
    actionsLog: iAction[][],
    // Claim data
    /** Stores all the current items */
    items: { [idString: string]: Item; },

    // Claim Indexes - Local
    claimEdgeIdsByParentId: IndexArray,
    claimEdgeIdsByChildId: IndexArray,

    //Score Indexes - Local
    scoreIdsBySourceId: IndexArray,
    childIdsByScoreId: IndexArray,
}

export class RsData implements iRsData {
    constructor(
        public actionsLog: iAction[][] = [],
        // Claim data
        /** Stores all the current items */
        public items: { [idString: string]: Item; } = {},

        // Claim Indexes - Local
        public claimEdgeIdsByParentId: IndexArray = {},
        public claimEdgeIdsByChildId: IndexArray = {},

        //Score Indexes - Local
        public scoreIdsBySourceId: IndexArray = {},
        public childIdsByScoreId: IndexArray = {},
    ) {
    }
}