import { Item } from "./Item";

export interface ItemDictionary { [idString: string]: Item; }
export interface Index { [searchIndex: string]: string; } //Store the string for the ID
export interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID
export interface IndexVersionDateArray { [searchIndex: string]: VersionDate[]; } //Store the string for the ID

export class VersionDate {
    constructor(
        public ItemIdString: string,
        public start: string,
        public end: string
    ) {
    }
}

export class RsData {
    constructor(
        public versions: ItemDictionary = {},
        public scoreBySourceClaimId: Index = {},
        public claimEdgesByParentId: IndexArray = {},
        public claimEdgesByChildId: IndexArray = {},
        public versionIdByItemId: IndexVersionDateArray = {},
    ) {
    }
}