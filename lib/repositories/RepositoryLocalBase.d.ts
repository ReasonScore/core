import { iClaimEdge } from "../dataModels/ClaimEdge";
import { iScore } from "../dataModels/Score";
import { iRsData } from "../dataModels/RsData";
import { iAction } from "../dataModels/Action";
import { iClaim } from "../dataModels/Claim";
import { iScoreTree } from "../dataModels/ScoreTree";
export declare class RepositoryLocalBase {
    rsData: iRsData;
    constructor(rsData?: iRsData);
    getClaim(id: string): Promise<iClaim | undefined>;
    getClaimEdge(id: string): Promise<iClaimEdge | undefined>;
    getScore(id: string): Promise<iScore | undefined>;
    getScoreTree(id: string): Promise<iScoreTree | undefined>;
    getClaimEdgesByParentId(parentId: string): Promise<iClaimEdge[]>;
    getClaimEdgesByChildId(childId: string): Promise<iClaimEdge[]>;
    getScoresBySourceId(sourceClaimId: string): Promise<iScore[]>;
    getChildrenByScoreId(parentScoreId: string): Promise<iScore[]>;
    readonly log: iAction[][];
}
