import { Action, ClaimEdge, Score, Claim } from "..";
import { RsData } from "./RsData";

export interface iRepository {
    rsData: RsData;
    notify(actions: Action[]): void
    getClaim(id: string): Promise<Claim | undefined>
    getClaimEdge(id: string): Promise<ClaimEdge | undefined>
    getScore(id: string): Promise<Score | undefined>
    getClaimEdgesByParentId(parentId: string): Promise<ClaimEdge[]>
    getClaimEdgesByChildId(childId: string): Promise<ClaimEdge[]>
    getScoresByClaimId(sourceClaimId: string): Promise<Score[]>
    getChildrenByScoreId(scoreId: string): Promise<Score[]>
}
