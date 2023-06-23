import { Action } from "./Action";
import { Claim } from "./Claim";
import { ClaimEdge } from "./ClaimEdge";
import { Score } from "./Score";
import { ScoreTree } from "./ScoreTree";
export interface Index<T> {
    [searchIndex: string]: T;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export declare class RsData {
    actionsLog: {
        actions: Action[];
    }[];
    /** Stores all the current items */
    items: {
        [id: string]: Score | ScoreTree | ClaimEdge | Claim;
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
        [id: string]: Score | ScoreTree | ClaimEdge | Claim;
    }, claimEdgeIdsByParentId?: IndexArray, claimEdgeIdsByChildId?: IndexArray, scoreIdsBySourceId?: IndexArray, childIdsByScoreId?: IndexArray, ScoreTreeIds?: string[]);
}
