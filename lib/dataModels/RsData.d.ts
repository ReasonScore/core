import { Item } from "./Item";
export interface ItemDictionary {
    [idString: string]: Item;
}
export interface Index {
    [searchIndex: string]: string;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export interface IndexVersionDateArray {
    [searchIndex: string]: VersionDate[];
}
export declare class VersionDate {
    ItemIdString: string;
    start: string;
    end: string;
    constructor(ItemIdString: string, start: string, end: string);
}
export declare class RsData {
    versions: ItemDictionary;
    scoreBySourceClaimId: Index;
    claimEdgesByParentId: IndexArray;
    claimEdgesByChildId: IndexArray;
    versionIdByItemId: IndexVersionDateArray;
    constructor(versions?: ItemDictionary, scoreBySourceClaimId?: Index, claimEdgesByParentId?: IndexArray, claimEdgesByChildId?: IndexArray, versionIdByItemId?: IndexVersionDateArray);
}
