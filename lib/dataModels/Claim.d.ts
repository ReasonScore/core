import { Item } from "./Item";
import { Type } from "./Type";
import { Id } from "./Id";
export declare class Claim implements iClaim, Item {
    content: string;
    id: Id;
    version: Id;
    start: string;
    end: string;
    reversible: boolean;
    type: Type;
    constructor(content?: string, id?: Id, version?: Id, start?: string, end?: string, reversible?: boolean);
}
export interface iClaim {
    id: Id;
    version: Id;
    type: Type;
    start: string;
    end: string;
    reversible: boolean;
}
