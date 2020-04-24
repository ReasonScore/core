import { ItemTypes } from "./ItemTypes";
import { Item } from "./Item";
export declare class Claim implements Item {
    content: string;
    id: string;
    reversible: boolean;
    type: ItemTypes;
    constructor(content?: string, id?: string, reversible?: boolean);
}
