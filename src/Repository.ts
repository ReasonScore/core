import { Item } from "./Item"

export class Repository {
    Subscriptions: Query[] = [];
    items: Item[] = [];

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
        public items: Item[] = [],
        public history: Date[] = [],
        public scores: Date[] = [],
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