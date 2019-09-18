import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/end";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";
import { Id } from "./dataModels/Id";
import { Item } from "./dataModels/Item";

interface ItemDictionary { [idString: string]: Item[]; }
interface Index { [searchIndex: string]: string; } //Store the string for the ID
interface IndexArray { [searchIndex: string]: string[]; } //Store the string for the ID

export class Indexes {
    scorebyClaimIdAndScope: Index = {}
    scoresByClaimId: IndexArray = {}
    claimEdgesByParentId: IndexArray = {}
}

export class Repository {
    public readonly items: ItemDictionary = {};
    public readonly indexes: Indexes = new Indexes();

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        for (const change of changes) {
            const idString = change.newItem.id.toString();
            //Change the end date on the previous version of this item to now
            const oldItems = this.items[idString]
            if (oldItems && oldItems.length > 0) {
                oldItems[0].end = new Date().toISOString();
            } else {
                this.items[idString] = [];
            }

            this.items[idString].unshift(change.newItem);

            if (change.newItem.type == Type.score) {
                this.indexScore(<Score>change.newItem);
            }

            if (change.newItem.type == Type.claimEdge) {
                this.indexClaimEdgeByParentId(<ClaimEdge>change.newItem);
            }
        }
    }

    private indexScore(score: Score) {
        //scoreByClaimIdAndScope
        if (score.scopeId) {
            this.indexes.scorebyClaimIdAndScope[
                score.sourceClaimId.toString() +
                score.scopeId.toString()
            ] = score.id.toString();
        }

        //scoreByClaimId
        let destination = this.indexes.scoresByClaimId[score.sourceClaimId.toString()];
        if (!destination) {
            destination = [];
            this.indexes.scoresByClaimId[score.sourceClaimId.toString()] = destination;
        }
        if (!destination.includes(score.id.toString())) {
            destination.push(score.id.toString())
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

    private getItemsForArray(itemIds: string[]): Item[] {
        const result: Item[] = [];
        for (const itemId of itemIds) {
            result.push(this.items[itemId][0]);
        }
        return result;
    }

    // getClaimEdge(id: Id, when: string = End): ClaimEdge {
    //     // let tempClaimEdge = this.rsData.claimEdges.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempClaimEdge ? tempClaimEdge : new ClaimEdge();
    //     return new ClaimEdge();
    // }

    getClaimEdgesByParentId(parentId: Id, when: string = End): ClaimEdge[] {
        return <ClaimEdge[]>this.getItemsForArray(this.indexes.claimEdgesByParentId[parentId.toString()])
    }

    // getScore(id: Id, when: string = End): Score {
    //     // let tempScore = this.rsData.scores.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempScore ? tempScore : new Score();
    //     return new Score();

    // }

    getScoresByClaimId(claimId: Id, when: string = End): Score[] {
        return <Score[]>this.getItemsForArray(this.indexes.scoresByClaimId[claimId.toString()])
    }

    /** Will create a new score if it does not already exist */
    getScoreByClaimIdAndScope(sourceClaimId: Id, scopeId: Id | undefined, when: string = End): Score {
        const scores = <Score[]>this.getItemsForArray(this.indexes.scoresByClaimId[sourceClaimId.toString()])
        debugger;
        let score = scores.find(s => s.scopeId == scopeId );
        if (score){
            return score;
        } else {
            return new Score();
        }
    }

    // getClaim(id: Id, when: string = End): Claim {
    //     // let tempClaim = this.rsData.claims.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempClaim ? tempClaim : new Claim();
    //     return new Claim();
    // }
}

