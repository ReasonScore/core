import { RsData } from "./dataModels/RsData";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/end";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Query } from "./dataModels/Query";
import { Score } from "./dataModels/Score";
import { Claim } from "./dataModels/Claim";
import { Id } from "./dataModels/Id";

export class Repository {
    public Subscribers: Query[] = [];

    constructor(
        public rsData: RsData = new RsData
    ) {
    }

    get(query: Query) {

        if (query.update) this.Subscribers.push(query);
        return new Promise<RsData>((response, reject) => {
            // To DO: make this pull out the right data instead of just dumping the whole object
            response(this.rsData);
        })

    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(transaction: Change[]) {
        for (let change of transaction) {
            if (change.newItem.type == Type.claimEdge) {
                let oldItem = this.getClaimEdge(change.newItem.id)
                oldItem.end = new Date().toISOString();
                this.rsData.claimEdges.push(<ClaimEdge>change.newItem)
                // Re-calculate score for all ancestors of this claim
                debugger;
                
            }
        }
    }

    calculateScore(){
        
    }

    getClaimEdge(id: Id, when: string = End): ClaimEdge {
        let tempClaimEdge = this.rsData.claimEdges.find(e =>
            e.id == id &&
            e.end >= End);
        return tempClaimEdge ? tempClaimEdge : new ClaimEdge();
    }

    getScore(id: Id, when: string = End): Score {
        let tempScore = this.rsData.scores.find(e =>
            e.id == id &&
            e.end >= End);
        return tempScore ? tempScore : new Score();
    }

    getClaim(id: Id, when: string = End): Claim {
        let tempClaim = this.rsData.claims.find(e =>
            e.id == id &&
            e.end >= End);
        return tempClaim ? tempClaim : new Claim();
    }
}

