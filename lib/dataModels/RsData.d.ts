import { Item } from "./Item";
export interface ItemDictionary {
    [idString: string]: Item[];
}
export interface Index {
    [searchIndex: string]: string;
}
export interface IndexArray {
    [searchIndex: string]: string[];
}
export declare class RsData {
    items: ItemDictionary;
    scoreBySourceClaimId: Index;
    claimEdgesByParentId: IndexArray;
    claimEdgesByChildId: IndexArray;
    constructor(items?: ItemDictionary, scoreBySourceClaimId?: Index, claimEdgesByParentId?: IndexArray, claimEdgesByChildId?: IndexArray);
}
