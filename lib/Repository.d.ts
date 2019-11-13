import { ClaimEdge } from "./dataModels/ClaimEdge";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { Item } from "./dataModels/Item";
import { RsData } from "./dataModels/RsData";
import { iRepository } from "./dataModels/iRepository";
export declare class Repository implements iRepository {
    readonly rsData: RsData;
    readonly log: Change[][];
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): void;
    private indexClaimEdgeByParentId;
    private indexClaimEdgeByChildId;
    private getItemsForArray;
    getItem(ItemId: Id, when?: string): Item | undefined;
    getClaimEdgesByParentId(parentId: Id, when?: string): ClaimEdge[];
    getClaimEdgesByChildId(childId: Id, when?: string): ClaimEdge[];
    getScoreBySourceClaimId(sourceClaimId: Id, when?: string): Score;
}
