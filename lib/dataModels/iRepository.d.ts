import { iAction, iClaimEdge, iScore, iClaim } from "..";
import { RsData } from "./RsData";
export interface iRepository {
    rsData: RsData;
    notify(actions: iAction[]): void;
    getClaim(id: string): Promise<iClaim | undefined>;
    getClaimEdge(id: string): Promise<iClaimEdge | undefined>;
    getScore(id: string): Promise<iScore | undefined>;
    getClaimEdgesByParentId(parentId: string): Promise<iClaimEdge[]>;
    getClaimEdgesByChildId(childId: string): Promise<iClaimEdge[]>;
    getScoresByClaimId(sourceClaimId: string): Promise<iScore[]>;
    getChildrenByScoreId(scoreId: string): Promise<iScore[]>;
}
