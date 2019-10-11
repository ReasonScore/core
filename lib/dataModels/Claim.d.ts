import { Item } from "./Item";
import { Type } from "./Type";
import { Id } from "./Id";
export declare class Claim implements Item {
    content: string;
    id: Id;
    version: Id;
    start: string;
    end: string;
    reversable: boolean;
    type: Type;
    constructor(content?: string, id?: Id, version?: Id, start?: string, end?: string, reversable?: boolean);
}
