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

export class Repository {
    public Subscribers: Query[] = [];

    constructor(
        public rsData: RsData = new RsData
    ) {
    }

    private subscribers: {(changes: Change[]): void;}[] = []

    subscribe(callback: (changes: Change[]) => void) : void {
        this.subscribers.push(callback)
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]) {
        for (const change of changes) {
            if (change.newItem.type == Type.claimEdge) {
                const oldItem = this.getClaimEdge(change.newItem.id)
                oldItem.end = new Date().toISOString();
                this.rsData.claimEdges.push(<ClaimEdge>change.newItem)
            }
            if (change.newItem.type == Type.score) {
                const newScore = <Score>change.newItem;
                //ToDo: this is a little weird that we are not using the ID like in the other items.
                const oldItem = this.getScorebyClaimIdAndScope(newScore.sourceClaimId,newScore.scopeId)
                oldItem.end = new Date().toISOString();
                newScore.id = oldItem.id;
                this.rsData.scores.push(newScore)
            }
        }

        for (const subscriber of this.subscribers){
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
    getScorebyClaimIdAndScope(sourceClaimId: Id, scopeId: Id | undefined, when: string = End, ): Score {
        let score = this.rsData.scores.find(e =>
            e.sourceClaimId == sourceClaimId &&
            e.scopeId == scopeId &&
            e.end >= End);

            if (score === undefined) {
                score = new Score(undefined, undefined, undefined,sourceClaimId, scopeId);
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

