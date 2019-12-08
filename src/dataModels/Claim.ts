import { Item } from "./Item";
import { ItemTypes } from "./ItemTypes";
import { newId } from "../newId";

export class Claim implements iClaim, Item {
    type: ItemTypes = 'claim'

    constructor(
        public content: string = "",
        public id: string = newId(),
        public reversible: boolean = false,
    ) {
    }
}

export interface iClaim {
    reversible: boolean,
}


