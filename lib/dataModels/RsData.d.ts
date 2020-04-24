import { Action } from "./Action";
import { Item } from "./Item";
export interface Index {
    [searchIndex: string]: string;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export declare class RsData implements RsData {
    actionsLog: {
        actions: Action[];
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
        actions: Action[];
    }[], 
    /** Stores all the current items */
    items?: {
        [idString: string]: Item;
    }, claimEdgeIdsByParentId?: IndexArray, claimEdgeIdsByChildId?: IndexArray, scoreIdsBySourceId?: IndexArray, childIdsByScoreId?: IndexArray, ScoreTreeIds?: string[]);
}
