import { iClaimEdge, ClaimEdge } from "./dataModels/ClaimEdge";
import { iAction } from "./dataModels/Action";
import { iScore } from "./dataModels/Score";
import { RsData, iRsData } from "./dataModels/RsData";
import { iRepository } from "./dataModels/iRepository";
import { iClaim } from "./dataModels/Claim";
import { claims } from "./reducers/claims";
import { claimEdges } from "./reducers/claimEdges";


export class Repository implements iRepository {

    constructor(
        public rsData: iRsData = new RsData()
    ) {
    }

    // TODO: move notify completely out of repository
    async notify(actions: iAction[]) {
        for (const action of actions) {
            //TODO: add more reducers
            this.rsData = claims(this.rsData, action);
            this.rsData = claimEdges(this.rsData, action);
        }
    }
    async getClaim(id: string): Promise<iClaim | undefined> {
        return this.rsData.claims[id];
    }
    async getClaimEdge(id: string): Promise<iClaimEdge | undefined> {
        return this.rsData.claimEdges[id];
    }
    async getScore(id: string): Promise<iScore | undefined> {
        return this.rsData.scores[id];
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
    async getScoresByClaimId(sourceClaimId: string): Promise<iScore[]> {
        const scoreIdStrings = this.rsData.scoreIdsByClaimId[sourceClaimId];
        const scores: iScore[] = [];
        if (scoreIdStrings) {
            for (const scoreIdString of scoreIdStrings) {
                const score = await this.getScore(scoreIdString)
                if (score) scores.push(score)
            }
        }
        return scores
    }
    async getChildrenByScoreId(parentScoreId: string): Promise<iScore[]> {
        const childIdStrings = this.rsData.childIdsByScoreId[parentScoreId];
        const scores: iScore[] = [];
        if (childIdStrings) {
            for (const scoreIdString of childIdStrings) {
                const score = await this.getScore(scoreIdString)
                if (score) scores.push(score)
            }
        }
        return scores
    }

    // /** this function can be called by outside code to notfy this repository of changes */
    // async notify(changes: Action[]) {
    //     this.rsData.log.unshift(changes);
    //     for (const change of changes) {
    //         const newData = change.newData;
    //         const idString = newData.id;
    //         const currentWhen = new Date().toISOString();

    //         // update items with new data
    //         const oldItem = this.rsData.items[idString];
    //         const newItem = { ...oldItem, ...newData};
    //         this.rsData.items[idString] = newItem;

    //         //Index Claim Edges
    //         if (newItem.type == Type.claimEdge) {
    //             this.indexClaimEdgeByParentId(<ClaimEdge>newItem);
    //             this.indexClaimEdgeByChildId(<ClaimEdge>newItem);
    //         }

    //         //Index score by source Id
    //         if (newData.type == Type.score) {
    //             const score = <Score>newData;
    //             this.rsData.scoreBySourceClaimId[score.sourceClaimId] = idString;
    //         }


    //     }
    // }

    // private indexClaimEdgeByParentId(claimEdge: ClaimEdge) {
    //     let destination = this.rsData.claimEdgesByParentId[claimEdge.parentId];
    //     if (!destination) {
    //         destination = [];
    //         this.rsData.claimEdgesByParentId[claimEdge.parentId] = destination;
    //     }
    //     if (!destination.includes(claimEdge.id)) {
    //         destination.push(claimEdge.id)
    //     }
    // }

    // private indexClaimEdgeByChildId(claimEdge: ClaimEdge) {
    //     let destination = this.rsData.claimEdgesByChildId[claimEdge.childId];
    //     if (!destination) {
    //         destination = [];
    //         this.rsData.claimEdgesByChildId[claimEdge.childId] = destination;
    //     }
    //     if (!destination.includes(claimEdge.id)) {
    //         destination.push(claimEdge.id)
    //     }
    // }


    // private async getItemsForArray(itemIds: string[]) {
    //     const result: Item[] = [];
    //     for (const itemId of itemIds) {
    //         const item = await this.getItem(ID(itemId));
    //         if (item) {
    //             result.push(item);
    //         }
    //     }
    //     return result;
    // }

    // async getItem(ItemId: Id, when: string = End): Promise<Item | undefined> {
    //     const versionData = this.rsData.versionIdByItemId[ItemId]
    //     if (versionData) {
    //         const VersionDate = this.rsData.versionIdByItemId[ItemId].find(e =>
    //             e.end >= End);
    //         if (VersionDate) {
    //             return this.rsData.versions[VersionDate.ItemIdString];
    //         }
    //     }
    // }

    // async getClaimEdgesByParentId(parentId: Id, when: string = End): Promise<ClaimEdge[]> {
    //     const claimEdgeIds = this.rsData.claimEdgesByParentId[parentId];
    //     if (claimEdgeIds) {
    //         return <ClaimEdge[]>await this.getItemsForArray(claimEdgeIds)
    //     } else {
    //         return [];
    //     }
    // }

    // async getClaimEdgesByChildId(childId: Id, when: string = End): Promise<ClaimEdge[]> {
    //     const claimEdgeIds = this.rsData.claimEdgesByChildId[childId];
    //     if (claimEdgeIds) {
    //         return <ClaimEdge[]>await this.getItemsForArray(claimEdgeIds)
    //     } else {
    //         return [];
    //     }
    // }

    // async getScoreBySourceClaimId(sourceClaimId: Id, when: string = End): Promise<Score | undefined> {
    //     const scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId];
    //     if (scoreIdString) {
    //         const score = <Score>await this.getItem(ID(scoreIdString));
    //         if (score) {
    //             return score;
    //         }
    //     }
    // }

}