import { RsData } from "./RsData";
import { iAction } from "./Action";
import { iClaim } from "./Claim";
import { iClaimEdge } from "./ClaimEdge";
import { iScore } from "./Score";
import { iScoreTree } from "./ScoreTree";

export interface iRepository {
    rsData: RsData;
    notify(actions: iAction[]): void // TODO: move notify completely out of repository?
    getClaim(id: string): Promise<iClaim | undefined>
    getClaimEdge(id: string): Promise<iClaimEdge | undefined>
    getScore(id: string): Promise<iScore | undefined>
    getScoreTree(id: string): Promise<iScoreTree | undefined>
    getClaimEdgesByParentId(parentId: string): Promise<iClaimEdge[]>
    getClaimEdgesByChildId(childId: string): Promise<iClaimEdge[]>
    getScoresBySourceId(sourceClaimId: string): Promise<iScore[]>
    getChildrenByScoreId(scoreId: string): Promise<iScore[]>
}
