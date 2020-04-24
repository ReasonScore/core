import { iClaimEdge } from "../dataModels/ClaimEdge";
import { Score } from "../dataModels/Score";
import { RsData, iRsData } from "../dataModels/RsData";
import { iAction } from "../dataModels/Action";
import { iClaim } from "../dataModels/Claim";
import { ScoreTree } from "../dataModels/ScoreTree";


export class RepositoryLocalBase {

    constructor(
        public rsData: iRsData = new RsData()
    ) {
    }

    async getClaim(id: string): Promise<iClaim | undefined> {
        return this.rsData.items[id] as iClaim;
    }
    async getClaimEdge(id: string): Promise<iClaimEdge | undefined> {
        return this.rsData.items[id] as iClaimEdge;
    }
    async getScore(id: string): Promise<Score | undefined> {
        return this.rsData.items[id] as Score;
    }
    async getScoreTree(id: string): Promise<ScoreTree | undefined> {
        return this.rsData.items[id] as ScoreTree;
    }
    async getClaimEdgesByParentId(parentId: string): Promise<iClaimEdge[]> {
        const claimEdgeIdStrings = this.rsData.claimEdgeIdsByParentId[parentId];
        const claimEdges: iClaimEdge[] = [];
        if (claimEdgeIdStrings) {
            for (const claimEdgeIdString of claimEdgeIdStrings) {
                const claimEdge = await this.getClaimEdge(claimEdgeIdString)
                if (claimEdge) claimEdges.push(claimEdge)
            }
        }
        return claimEdges
    }
    async getClaimEdgesByChildId(childId: string): Promise<iClaimEdge[]> {
        const claimEdgeIdStrings = this.rsData.claimEdgeIdsByChildId[childId];
        const claimEdges: iClaimEdge[] = [];
        for (const claimEdgeIdString of claimEdgeIdStrings) {
            const claimEdge = await this.getClaimEdge(claimEdgeIdString)
            if (claimEdge) claimEdges.push(claimEdge)
        }
        return claimEdges
    }
    async getScoresBySourceId(sourceClaimId: string): Promise<Score[]> {
        const scoreIdStrings = this.rsData.scoreIdsBySourceId[sourceClaimId];
        const scores: Score[] = [];
        if (scoreIdStrings) {
            for (const scoreIdString of scoreIdStrings) {
                const score = await this.getScore(scoreIdString)
                if (score) scores.push(score)
            }
        }
        return scores
    }
    async getChildrenByScoreId(parentScoreId: string): Promise<Score[]> {
        const childIdStrings = this.rsData.childIdsByScoreId[parentScoreId];
        const scores: Score[] = [];
        if (childIdStrings) {
            for (const scoreIdString of childIdStrings) {
                const score = await this.getScore(scoreIdString)
                if (score) scores.push(score)
            }
        }
        return scores
    }
    public readonly log: iAction[][] = [];

}