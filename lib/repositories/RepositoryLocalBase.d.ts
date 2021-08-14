import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Score } from "../dataModels/Score";
import { RsData } from "../dataModels/RsData";
import { Action } from "../dataModels/Action";
import { Claim } from "../dataModels/Claim";
import { ScoreTree } from "../dataModels/ScoreTree";
export declare class RepositoryLocalBase {
    rsData: RsData;
    constructor(rsData?: RsData);
    getClaim(id: string): Promise<Claim | undefined>;
    getClaimEdge(id: string): Promise<ClaimEdge | undefined>;
    getScore(id: string): Promise<Score | undefined>;
    getScoreTree(id: string): Promise<ScoreTree | undefined>;
    getClaimEdgesByParentId(parentId: string): Promise<ClaimEdge[]>;
    getClaimEdgesByChildId(childId: string): Promise<ClaimEdge[]>;
    getScoresBySourceId(sourceClaimId: string): Promise<Score[]>;
    getChildrenByScoreId(parentScoreId: string): Promise<Score[]>;
    getDescendantScoresById(mainScoreId: string): Promise<Score[]>;
    getLeafScoresById(mainScoreId: string): Promise<Score[]>;
    readonly log: Action[][];
}
