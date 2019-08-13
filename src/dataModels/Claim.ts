import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId";
import End from "./End";

export class Claim implements Item {
    type: string = Type.claim.toString()
    
    constructor(
        public content: string = "",
        public id: string = newId(),
        public version: string = newId(),
        public start: string = new Date().toISOString(),
        public end: string = End,
    ) {
    }
}


