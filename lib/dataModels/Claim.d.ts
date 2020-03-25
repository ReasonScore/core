import { ItemTypes } from "./ItemTypes";
export declare class Claim implements iClaim {
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
    /** allow for other properties by external implementations */
    [others: string]: any;
}
