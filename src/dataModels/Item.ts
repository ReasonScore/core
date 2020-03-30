import { ItemTypes } from "./ItemTypes";

export interface Item {
    type: ItemTypes,
    id: string,
    /** allow for other properties by external implementations */
    [others: string]: any;
}


