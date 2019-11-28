import { Change, Id, ClaimEdge, Score } from "..";
import { Item } from "./Item";

export interface iRepository {
    notify(changes: Change[]): void
    getItem(ItemId: Id, when?: string): Promise<Item | undefined>
    getClaimEdgesByParentId(parentId: Id, when?: string): Promise<ClaimEdge[]>
    getClaimEdgesByChildId(childId: Id, when?: string): Promise<ClaimEdge[]>
    getScoreBySourceClaimId(sourceClaimId: Id, when?: string): Promise<Score>
}
