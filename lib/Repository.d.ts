import { ClaimEdge } from "./dataModels/ClaimEdge";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { Item } from "./dataModels/Item";
interface ItemDictionary {
    [idString: string]: Item[];
}
interface Index {
    [searchIndex: string]: string;
}
interface IndexArray {
    [searchIndex: string]: string[];
}
export declare class Indexes {
    scoreByClaimIdAndScope: Index;
    scoresByClaimId: IndexArray;
    claimEdgesByParentId: IndexArray;
}
export declare class Repository {
    readonly items: ItemDictionary;
    readonly indexes: Indexes;
    readonly log: Change[][];
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): void;
    private indexScore;
    private indexClaimEdgeByParentId;
    private getItemsForArray;
    getClaimEdgesByParentId(parentId: Id, when?: string): ClaimEdge[];
    getScoresByClaimId(claimId: Id, when?: string): Score[];
    /** Will create a new score if it does not already exist */
    getScoreByClaimIdAndScope(claimId: Id, scopeId: Id | undefined, when?: string): Score;
}
export {};
