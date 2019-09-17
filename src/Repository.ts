import { RsData } from "./dataModels/RsData";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/end";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Query } from "./dataModels/Query";
import { Score } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";
import { Id } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";
import { Item } from "./dataModels/Item";

interface ItemDictionary { [idString: string]: Item[]; }
interface Index { [searchIndex: string]: string; } //Store the string for the ID

class Indexes {
    scorebyClaimIdAndScope: Index = {}
}

export class Repository {
    private subscribers: { (changes: Change[]): void; }[] = []
    private items: ItemDictionary = {};
    private indexes: Indexes = new Indexes();

    subscribe(callback: (changes: Change[]) => void): void {
        this.subscribers.push(callback)
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        for (const change of changes) {
            //Store by ID
            const oldItem = this.items[change.newItem.id.toString()][0]
            oldItem.end = new Date().toISOString();
            this.items[change.newItem.id.toString()].unshift(change.newItem);

            if (change.newItem.type == Type.score) {
                const score = <Score>change.newItem
                if (score.scopeId) {
                    this.indexes.scorebyClaimIdAndScope[
                        score.sourceClaimId.toString() +
                        score.scopeId.toString()
                    ] = score.id.toString();
                }
            }
        }

        for (const subscriber of this.subscribers) {
            subscriber(changes);
        }
    }

    getClaimEdge(id: Id, when: string = End): ClaimEdge {
        let tempClaimEdge = this.rsData.claimEdges.find(e =>
            e.id == id &&
            e.end >= End);
        return tempClaimEdge ? tempClaimEdge : new ClaimEdge();
    }

    getClaimEdgesByParentId(parentId: Id, when: string = End): ClaimEdge[] {
        return this.rsData.claimEdges.filter(e =>
            e.parentId == parentId &&
            e.end >= End);
    }

    getScore(id: Id, when: string = End): Score {
        let tempScore = this.rsData.scores.find(e =>
            e.id == id &&
            e.end >= End);
        return tempScore ? tempScore : new Score();
    }

    getScoresbyClaimId(id: Id, when: string = End): Score[] {
        return this.rsData.scores.filter(e =>
            e.sourceClaimId == id &&
            e.end >= End);
    }

    /** Will create a new score if it does not already exist */
    getScorebyClaimIdAndScope(sourceClaimId: Id, scopeId: Id | undefined, when: string = End): Score {
        let score = this.rsData.scores.find(e =>
            e.sourceClaimId == sourceClaimId &&
            e.scopeId == scopeId &&
            e.end >= End);

        if (score === undefined) {
            score = new Score(undefined, undefined, undefined, sourceClaimId, scopeId);
            this.rsData.scores.push(score);
        }

        return score;
    }

    getClaim(id: Id, when: string = End): Claim {
        let tempClaim = this.rsData.claims.find(e =>
            e.id == id &&
            e.end >= End);
        return tempClaim ? tempClaim : new Claim();
    }
}

