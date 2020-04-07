import { iAction, Item } from "..";
export interface Index {
    [searchIndex: string]: string;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export interface iRsData {
    /** Stores all the actions sent through */
    actionsLog: {
        actions: iAction[];
    }[];
    /** Stores all the current items */
    items: {
        [idString: string]: Item;
    };
    claimEdgeIdsByParentId: IndexArray;
    claimEdgeIdsByChildId: IndexArray;
    scoreIdsBySourceId: IndexArray;
    childIdsByScoreId: IndexArray;
    ScoreTreeIds: string[];
}
export declare class RsData implements iRsData {
    actionsLog: {
        actions: iAction[];
    }[];
    /** Stores all the current items */
    items: {
        [idString: string]: Item;
    };
    claimEdgeIdsByParentId: IndexArray;
    claimEdgeIdsByChildId: IndexArray;
    scoreIdsBySourceId: IndexArray;
    childIdsByScoreId: IndexArray;
    ScoreTreeIds: string[];
    constructor(actionsLog?: {
        actions: iAction[];
    }[], 
    /** Stores all the current items */
    items?: {
        [idString: string]: Item;
    }, claimEdgeIdsByParentId?: IndexArray, claimEdgeIdsByChildId?: IndexArray, scoreIdsBySourceId?: IndexArray, childIdsByScoreId?: IndexArray, ScoreTreeIds?: string[]);
}
