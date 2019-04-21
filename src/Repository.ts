import { View } from "./View";
import { Claim } from "./Claim";
import { Score } from "./Score";
import { Item } from "./Item";
import { ClaimEdge } from "./ClaimEdge";
import { ViewEdge } from "./viewEdge";
import { RSData } from "./RsData";

export class Repository {
    public Subscribers: Query[] = [];

    constructor(
        public rsData:RSData = new RSData
        ) {
    }

    get(query: Query) {

        if (query.update) this.Subscribers.push(query);
        return new Promise<RSData>((response, reject) => {
            // To DO: make this pull out the right data instead of just dumping the whole object
            response(this.rsData);
        })

    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(transaction: Change[]) {



    }
}

export class Change {
    constructor(
        public versionId: string,
        public oldItem: Item,
        public newItem: Item
    ) {
    }
}

export interface Query {
    start?: Date;
    end?: Date;
    depth?: number;
    claimId: number;
    viewOnly: boolean;
    update: () => Change[];
}