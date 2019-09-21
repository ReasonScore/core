import { Claim } from "./Claim";
import { ClaimEdge } from "./ClaimEdge";
import { Score } from "./Score";
import { View } from "./View";
import { ViewEdge } from "./viewEdge";
import { Item } from "./Item";

export interface ItemDictionary { [idString: string]: Item[]; }
export interface Index { [searchIndex: string]: string; } //Store the string for the ID
export interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export class RsData {
    constructor(
        public items: ItemDictionary = {},
        public scoreBySourceClaimId: Index = {},
        public claimEdgesByParentId: IndexArray = {},
        public claimEdgesByChildId: IndexArray = {},
    ) {
    }
}