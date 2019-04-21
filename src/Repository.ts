import { Item } from "./dataModels/Item";
import { RsDate } from "./dataModels/RsData";

export class Repository {
    public Subscribers: Query[] = [];

    constructor(
        public rsData:RsDate = new RsDate
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