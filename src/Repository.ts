import { ClaimEdge } from "./dataModels/ClaimEdge";
import { Action } from "./dataModels/Action";
import { Score } from "./dataModels/Score";
import { RsData } from "./dataModels/RsData";
import { iRepository } from "./dataModels/iRepository";
import { Claim } from "./dataModels/Claim";
import { claims } from "./reducers/claims";


export class Repository implements iRepository {

    constructor(
        public rsData: RsData = new RsData()
    ) {
    }

    async notify(actions: Action[]) {
        //todo: change this over to reducers and state
        for (const action of actions) {
            // if (action.type == 'add_claim') {
            //     this.rsData.claims[action.dataId] = action.newData;
            // }
            this.rsData = claims(this.rsData, action);
            if (action.type == 'add_claimEdge') {
                //ToDo allow partial updates
                this.rsData.claimEdges[action.dataId] = action.newData;
                // // todo update indexes
                // if (!this.rsData.claimEdgeIdsByChildId[action.dataId]){
                //     this.rsData.claimEdgeIdsByChildId[action.dataId] = [];
                // }
                // this.rsData.claimEdgeIdsByChildId[action.dataId].unshift(action.dataId)
            }
        }
    }
    async getClaim(id: string): Promise<Claim | undefined> {
        return this.rsData.claims[id];
    }
    async getClaimEdge(id: string): Promise<ClaimEdge | undefined> {
        return this.rsData.claimEdges[id];
    }
    async getScore(id: string): Promise<Score | undefined> {
        return this.rsData.scores[id];
    }
    async getClaimEdgesByParentId(parentId: string): Promise<ClaimEdge[]> {
        const claimEdgeIdStrings = this.rsData.claimEdgeIdsByParentId[parentId];
        const claimEdges: ClaimEdge[] = [];
        if (claimEdgeIdStrings) {
            for (const claimEdgeIdString of claimEdgeIdStrings) {
                const claimEdge = await this.getClaimEdge(claimEdgeIdString)
                if (claimEdge) claimEdges.push(claimEdge)
            }
        }
        return claimEdges
    }
    async getClaimEdgesByChildId(childId: string): Promise<ClaimEdge[]> {
        const claimEdgeIdStrings = this.rsData.claimEdgeIdsByChildId[childId];
        const claimEdges: ClaimEdge[] = [];
        for (const claimEdgeIdString of claimEdgeIdStrings) {
            const claimEdge = await this.getClaimEdge(claimEdgeIdString)
            if (claimEdge) claimEdges.push(claimEdge)
        }
        return claimEdges
    }
    async getScoresByClaimId(sourceClaimId: string): Promise<Score[]> {
        const scoreIdStrings = this.rsData.scoreIdsByClaimId[sourceClaimId];
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