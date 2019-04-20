import { View } from "./View";
import { Claim } from "./Claim";
import { Score } from "./Score";
import { Item } from "./Item";
import { ClaimEdge } from "./ClaimEdge";
import { ViewEdge } from "./viewEdge";

export class Repository {
    Subscriptions: Query[] = [];

    constructor() {

    }

    get(query: Query) {

        if (query.update) this.Subscriptions.push(query);
        return new Promise<RSData>((response, reject) => {

        })

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
    update: () => Change[];
}