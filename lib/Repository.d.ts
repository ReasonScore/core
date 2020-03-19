import { ClaimEdge } from "./dataModels/ClaimEdge";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { Item } from "./dataModels/Item";
import { RsData } from "./dataModels/RsData";
import { iRepository } from "./dataModels/iRepository";
export declare class Repository implements iRepository {
    rsData: RsData;
    readonly log: Change[][];
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): Promise<void>;
    private indexClaimEdgeByParentId;
    private indexClaimEdgeByChildId;
    private getItemsForArray;
    getItem(ItemId: Id, when?: string): Promise<Item | undefined>;
    getClaimEdgesByParentId(parentId: Id, when?: string): Promise<ClaimEdge[]>;
    getClaimEdgesByChildId(childId: Id, when?: string): Promise<ClaimEdge[]>;
    getScoreBySourceClaimId(sourceClaimId: Id, when?: string): Promise<Score | undefined>;
}
