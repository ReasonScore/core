import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/end";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id, ID } from "./dataModels/Id";
import { Item } from "./dataModels/Item";

interface ItemDictionary { [idString: string]: Item[]; }
interface Index { [searchIndex: string]: string; } //Store the string for the ID
interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export class Indexes {
    scoreBySourceClaimId: Index = {};
    claimEdgesByParentId: IndexArray = {}
    claimEdgesByChildId: IndexArray = {}
}

export class Repository {
    public readonly items: ItemDictionary = {};
    public readonly indexes: Indexes = new Indexes();
    public readonly log: Change[][] = [];

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        this.log.unshift(changes);
        for (const change of changes) {
            const newItem = change.newItem;
            const idString = newItem.id.toString();

            //Change the end date on the previous version of this item to now
            const oldItems = this.items[idString]
            if (oldItems && oldItems.length > 0) {
                oldItems[0].end = new Date().toISOString();
            } else {
                this.items[idString] = [];
            }

            // add the new item to the list of items
            this.items[idString].unshift(change.newItem);

            //Index Claim Edges
            if (change.newItem.type == Type.claimEdge) {
                this.indexClaimEdgeByParentId(<ClaimEdge>change.newItem);
                this.indexClaimEdgeByChildId(<ClaimEdge>change.newItem);
            }

            //Index score by source Id
            if (newItem.type == Type.score) {
                const score = <Score>newItem;
                this.indexes.scoreBySourceClaimId[score.sourceClaimId.toString()] = idString;
            }


        }
    }

    private indexClaimEdgeByParentId(claimEdge: ClaimEdge) {
        let destination = this.indexes.claimEdgesByParentId[claimEdge.parentId.toString()];
        if (!destination) {
            destination = [];
            this.indexes.claimEdgesByParentId[claimEdge.parentId.toString()] = destination;
        }
        if (!destination.includes(claimEdge.id.toString())) {
            destination.push(claimEdge.id.toString())
        }
    }

    private indexClaimEdgeByChildId(claimEdge: ClaimEdge) {
        let destination = this.indexes.claimEdgesByChildId[claimEdge.childId.toString()];
        if (!destination) {
            destination = [];
            this.indexes.claimEdgesByChildId[claimEdge.childId.toString()] = destination;
        }
        if (!destination.includes(claimEdge.id.toString())) {
            destination.push(claimEdge.id.toString())
        }
    }


    private getItemsForArray(itemIds: string[]): Item[] {
        const result: Item[] = [];
        for (const itemId of itemIds) {
            result.push(this.items[itemId][0]);
        }
        return result;
    }

    getItem(ItemId: Id, when: string = End): Item | undefined {
        return this.items[ItemId.toString()].find(e =>
            e.end >= End);
    }

    getClaimEdgesByParentId(parentId: Id, when: string = End): ClaimEdge[] {
        return <ClaimEdge[]>this.getItemsForArray(this.indexes.claimEdgesByParentId[parentId.toString()])
    }

    getClaimEdgesByChildId(childId: Id, when: string = End): ClaimEdge[] {
        const claimEdgeIds = this.indexes.claimEdgesByChildId[childId.toString()];
        if (claimEdgeIds) {
            return <ClaimEdge[]>this.getItemsForArray(claimEdgeIds)
        } else {
            return [];
        }
    }

    getScoreBySourceClaimId(sourceClaimId: Id, when: string = End): Score {
        const scoreIdString = this.indexes.scoreBySourceClaimId[sourceClaimId.toString()];
        const score = <Score>this.getItem(ID(scoreIdString));
        if (score) {
            return score;
        } else {
            return new Score();
        }
    }


}

