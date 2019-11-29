import { Id } from "./Id";
import { Item } from "./Item";
export declare class Change {
    newItem: Item;
    oldItemVersion?: Id | undefined;
    constructor(newItem: Item, oldItemVersion?: Id | undefined);
}
