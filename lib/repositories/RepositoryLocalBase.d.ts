import { iClaimEdge } from "../dataModels/ClaimEdge";
import { Score } from "../dataModels/Score";
import { iRsData } from "../dataModels/RsData";
import { iAction } from "../dataModels/Action";
import { iClaim } from "../dataModels/Claim";
import { ScoreTree } from "../dataModels/ScoreTree";
export declare class RepositoryLocalBase {
    rsData: iRsData;
    constructor(rsData?: iRsData);
    getClaim(id: string): Promise<iClaim | undefined>;
    getClaimEdge(id: string): Promise<iClaimEdge | undefined>;
    getScore(id: string): Promise<Score | undefined>;
    getScoreTree(id: string): Promise<ScoreTree | undefined>;
    getClaimEdgesByParentId(parentId: string): Promise<iClaimEdge[]>;
    getClaimEdgesByChildId(childId: string): Promise<iClaimEdge[]>;
    getScoresBySourceId(sourceClaimId: string): Promise<Score[]>;
    getChildrenByScoreId(parentScoreId: string): Promise<Score[]>;
    readonly log: iAction[][];
}
