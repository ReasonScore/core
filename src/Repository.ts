import { View } from "./View";
import { Claim } from "./Claim";
import { Score } from "./Score";
import { Item } from "./Item";
import { ClaimEdge } from "./ClaimEdge";
import { ViewEdge } from "./viewEdge";
import { ExampleData } from "./ExampleData";

export class Repository {
    public Subscribers: Query[] = [];

    constructor() {

    }

    get(query: Query) {

        if (query.update) this.Subscribers.push(query);
        return new Promise<RSData>((response, reject) => {
            response(ExampleData());
        })

    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify(transaction: Change[]) {

    }
}

export class RSData {
    constructor(
        public claims: Claim[] = [],
        public claimEdges: ClaimEdge[] = [],
        public history: Date[] = [],
        public scores: Score[] = [],
        public views: View[] = [],
        public viewEdges: ViewEdge[] = [],
    ) {
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