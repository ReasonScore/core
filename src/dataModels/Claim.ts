import { Item } from "./Item";
import { Type } from "./Type";
import { newId } from "../newId";
import { Id } from "./Id";

export class Claim implements iClaim, Item {
    type: Type = Type.claim

    constructor(
        public content: string = "",
        public id: Id = newId(),
        public reversible: boolean = false,
    ) {
    }
}

export interface iClaim {
    reversible: boolean,
}


