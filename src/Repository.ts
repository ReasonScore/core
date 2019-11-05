import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/End";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id, ID } from "./dataModels/Id";
import { Item } from "./dataModels/Item";
import { RsData } from "./dataModels/RsData";


export class Repository {
    public readonly rsData: RsData = new RsData();
    public readonly log: Change[][] = [];

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        this.log.unshift(changes);
        for (const change of changes) {
            const newItem = change.newItem;
            const idString = newItem.id.toString();

            //Change the end date on the previous version of this item to now
            const oldItems = this.rsData.items[idString]
            if (oldItems && oldItems.length > 0) {
                oldItems[0].end = new Date().toISOString();
            } else {
                this.rsData.items[idString] = [];
            }

            // add the new item to the list of items
            this.rsData.items[idString].unshift(change.newItem);

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


    private getItemsForArray(itemIds: string[]): Item[] {
        const result: Item[] = [];
        for (const itemId of itemIds) {
            result.push(this.rsData.items[itemId][0]);
        }
        return result;
    }

    getItem(ItemId: Id, when: string = End): Item | undefined {
        return this.rsData.items[ItemId.toString()].find(e =>
            e.end >= End);
    }

    getClaimEdgesByParentId(parentId: Id, when: string = End): ClaimEdge[] {
        const claimEdgeIds = this.rsData.claimEdgesByParentId[parentId.toString()];
        if (claimEdgeIds) {
            return <ClaimEdge[]>this.getItemsForArray(claimEdgeIds)
        } else {
            return [];
        }
    }

    getClaimEdgesByChildId(childId: Id, when: string = End): ClaimEdge[] {
        const claimEdgeIds = this.rsData.claimEdgesByChildId[childId.toString()];
        if (claimEdgeIds) {
            return <ClaimEdge[]>this.getItemsForArray(claimEdgeIds)
        } else {
            return [];
        }
    }

    getScoreBySourceClaimId(sourceClaimId: Id, when: string = End): Score {
        const scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];
        if (scoreIdString) {
            const score = <Score>this.getItem(ID(scoreIdString));
            if (score) {
                return score;
            }
        }
        return new Score(undefined,undefined,undefined,sourceClaimId);
    }

}