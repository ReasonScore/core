import { Item } from "./Item";
import { Type } from "./Type";

export class Claim implements Item {
    type: Type = Type.claim
    
    constructor(
        public content: string = "",
        public id: string = "",
        public version: string = "",
        public start: Date = new Date(),
        public end: Date = new Date('3000-01-01'),
    ) {
    }
}