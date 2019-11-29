import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/End";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id, ID } from "./dataModels/Id";
import { Item } from "./dataModels/Item";
import { RsData, VersionDate } from "./dataModels/RsData";
import { iRepository } from "./dataModels/iRepository";


export class Repository implements iRepository {
    public rsData: RsData = new RsData();
    public readonly log: Change[][] = [];

    /** this function can be called by outside code to notfy this repository of changes */
    async notify(changes: Change[]) {
        this.log.unshift(changes);
        for (const change of changes) {
            const newItem = change.newItem;
            const idString = newItem.id.toString();
            const currentWhen = new Date().toISOString();

            //Change the end date on the previous version of this item to now
            const oldItems = this.rsData.versionIdByItemId[idString]
            if (oldItems && oldItems.length > 0 && oldItems[0].end === End) {
                oldItems[0].end = currentWhen;
                const oldItem = this.rsData.versions[oldItems[0].ItemIdString]
                if (oldItem && oldItem.end === End) {
                    oldItem.end = oldItems[0].end;
                }
            } else {
                this.rsData.versionIdByItemId[idString] = [];
            }

            // add the new item to the list of items
            this.rsData.versions[newItem.version.toString()] = newItem;
            this.rsData.versionIdByItemId[idString].unshift(
                new VersionDate(newItem.version.toString(), newItem.start, newItem.end)
            );

            //Index Claim Edges
            if (change.newItem.type == Type.claimEdge) {
                this.indexClaimEdgeByParentId(<ClaimEdge>change.newItem);
                this.indexClaimEdgeByChildId(<ClaimEdge>change.newItem);
            }

            //Index score by source Id
            if (newItem.type == Type.score) {
                const score = <Score>newItem;
                this.rsData.scoreBySourceClaimId[score.sourceClaimId.toString()] = idString;
            }


        }
    }

    private indexClaimEdgeByParentId(claimEdge: ClaimEdge) {
        let destination = this.rsData.claimEdgesByParentId[claimEdge.parentId.toString()];
        if (!destination) {
            destination = [];
            this.rsData.claimEdgesByParentId[claimEdge.parentId.toString()] = destination;
        }
        if (!destination.includes(claimEdge.id.toString())) {
            destination.push(claimEdge.id.toString())
        }
    }

    private indexClaimEdgeByChildId(claimEdge: ClaimEdge) {
        let destination = this.rsData.claimEdgesByChildId[claimEdge.childId.toString()];
        if (!destination) {
            destination = [];
            this.rsData.claimEdgesByChildId[claimEdge.childId.toString()] = destination;
        }
        if (!destination.includes(claimEdge.id.toString())) {
            destination.push(claimEdge.id.toString())
        }
    }


    private async getItemsForArray(itemIds: string[]) {
        const result: Item[] = [];
        for (const itemId of itemIds) {
            const item = await this.getItem(ID(itemId));
            if (item) {
                result.push(item);
            }
        }
        return result;
    }

    async getItem(ItemId: Id, when: string = End): Promise<Item | undefined> {
        const VersionDate = this.rsData.versionIdByItemId[ItemId.toString()].find(e =>
            e.end >= End);
        if (VersionDate) {
            return this.rsData.versions[VersionDate.ItemIdString];
        }
    }

    async getClaimEdgesByParentId(parentId: Id, when: string = End): Promise<ClaimEdge[]> {
        const claimEdgeIds = this.rsData.claimEdgesByParentId[parentId.toString()];
        if (claimEdgeIds) {
            return <ClaimEdge[]> await this.getItemsForArray(claimEdgeIds)
        } else {
            return [];
        }
    }

    async getClaimEdgesByChildId(childId: Id, when: string = End): Promise<ClaimEdge[]> {
        const claimEdgeIds = this.rsData.claimEdgesByChildId[childId.toString()];
        if (claimEdgeIds) {
            return <ClaimEdge[]> await this.getItemsForArray(claimEdgeIds)
        } else {
            return [];
        }
    }

    async getScoreBySourceClaimId(sourceClaimId: Id, when: string = End): Promise<Score> {
        const scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];
        if (scoreIdString) {
            const score = <Score> await this.getItem(ID(scoreIdString));
            if (score) {
                return score;
            }
        }

        //If there is not an existing score then create it
        const newScore = new Score(undefined, undefined, undefined, sourceClaimId);
        await this.notify([new Change(newScore)]);
        return newScore;
    }

}