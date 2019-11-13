import { Change, Id, ClaimEdge, Score } from "..";
import { Item } from "./Item";
export interface iRepository {
    notify(changes: Change[]): void;
    getItem(ItemId: Id, when?: string): Item | undefined;
    getClaimEdgesByParentId(parentId: Id, when?: string): ClaimEdge[];
    getClaimEdgesByChildId(childId: Id, when?: string): ClaimEdge[];
    getScoreBySourceClaimId(sourceClaimId: Id, when?: string): Score;
}
