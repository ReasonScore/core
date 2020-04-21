import { ItemTypes } from "./ItemTypes";
import { Item } from "..";
export declare class Claim implements iClaim, Item {
    content: string;
    id: string;
    reversible: boolean;
    type: ItemTypes;
    constructor(content?: string, id?: string, reversible?: boolean);
}
export interface iClaim {
    type: ItemTypes;
    id: string;
    reversible: boolean;
}
