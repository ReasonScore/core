import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId";
import End from "./End";
import { Id } from "./Id";

export class Claim implements iClaim, Item {
    type: Type = Type.claim

    constructor(
        public content: string = "",
        public id: Id = newId(),
        public version: Id = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
        public reversible: boolean = false,
    ) {
    }
}

export interface iClaim {
    id: Id,
    version: Id,
    type: Type 
    start: string,
    end: string,
    reversible: boolean,
}


