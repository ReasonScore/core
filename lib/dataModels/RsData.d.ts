import { iAction, Item } from "..";
export interface Index {
    [searchIndex: string]: string;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export interface iRsData {
    /** Stores all the actions sent through */
    actionsLog: iAction[][];
    /** Stores all the current items */
    items: {
        [idString: string]: Item;
    };
    claimEdgeIdsByParentId: IndexArray;
    claimEdgeIdsByChildId: IndexArray;
    scoreIdsBySourceId: IndexArray;
    childIdsByScoreId: IndexArray;
}
export declare class RsData implements iRsData {
    actionsLog: iAction[][];
    /** Stores all the current items */
    items: {
        [idString: string]: Item;
    };
    claimEdgeIdsByParentId: IndexArray;
    claimEdgeIdsByChildId: IndexArray;
    scoreIdsBySourceId: IndexArray;
    childIdsByScoreId: IndexArray;
    constructor(actionsLog?: iAction[][], 
    /** Stores all the current items */
    items?: {
        [idString: string]: Item;
    }, claimEdgeIdsByParentId?: IndexArray, claimEdgeIdsByChildId?: IndexArray, scoreIdsBySourceId?: IndexArray, childIdsByScoreId?: IndexArray);
}
