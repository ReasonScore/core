import { Action } from "./Action";
import { Item } from "./Item";

export interface Index { [searchIndex: string]: string; } //Store the string for the ID
export interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export class RsData implements RsData {
    constructor(
        public actionsLog: { actions: Action[] }[] = [],
        // Claim data
        /** Stores all the current items */
        public items: { [idString: string]: Item; } = {},

        // Claim Indexes - Local
        public claimEdgeIdsByParentId: IndexArray = {},
        public claimEdgeIdsByChildId: IndexArray = {},

        //Score Indexes - Local
        public scoreIdsBySourceId: IndexArray = {},
        public childIdsByScoreId: IndexArray = {},
        public ScoreTreeIds: string[] = [],
    ) {
    }
}
