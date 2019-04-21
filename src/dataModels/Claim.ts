import { Item } from "./Item";
import { Type } from "./Type";

export class Claim implements Item {
    type: string = Type.claim.toString()
    
    constructor(
        public content: string = "",
        public id: string = "",
        public version: string = "",
        public start: string = new Date().toISOString(),
        public end: string = new Date('3000-01-01').toISOString(),
    ) {
    }
}


