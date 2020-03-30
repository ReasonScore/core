import { iAction, iClaimEdge, iScore, iClaim, RsData } from "..";

export interface iRepository {
    rsData: RsData;
    notify(actions: iAction[]): void // TODO: move notify completely out of repository?
    getClaim(id: string): Promise<iClaim | undefined>
    getClaimEdge(id: string): Promise<iClaimEdge | undefined>
    getScore(id: string): Promise<iScore | undefined>
    getClaimEdgesByParentId(parentId: string): Promise<iClaimEdge[]>
    getClaimEdgesByChildId(childId: string): Promise<iClaimEdge[]>
    getScoresBySourceId(sourceClaimId: string): Promise<iScore[]>
    getChildrenByScoreId(scoreId: string): Promise<iScore[]>
}
