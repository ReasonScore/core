import { RsDate } from "./dataModels/RsData";
import { ClaimEdge } from "./dataModels/ClaimEdge";
import End from "./dataModels/end";
import { Type } from "./dataModels/Type";
import { Change } from "./dataModels/Change";
import { Query } from "./dataModels/Query";

export class Repository {
    public Subscribers: Query[] = [];

    constructor(
        public rsData: RsDate = new RsDate
    ) {
    }

    get(query: Query) {

        if (query.update) this.Subscribers.push(query);
        return new Promise<RsDate>((response, reject) => {
            // To DO: make this pull out the right data instead of just dumping the whole object
            response(this.rsData);
        })

    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(transaction: Change[]) {
        for (let change of transaction) {
            if (change.newItem.type == Type.claimEdge) {
                let oldItem = this.getclaimEdge(change.newItem.id)
                oldItem.end = new Date().toISOString();
                this.rsData.claimEdges.push(<ClaimEdge>change.newItem)
                // Re-calculate score for all ancestors of this claim

            }
        }
    }

    getclaimEdge(id: string, when: string = "3000-01-01T00:00:00.000Z"): ClaimEdge {
        let tempclaimEdge = this.rsData.claimEdges.find(e =>
            e.id == id &&
            e.end >= End);
        return tempclaimEdge ? tempclaimEdge : new ClaimEdge();
    }
}

