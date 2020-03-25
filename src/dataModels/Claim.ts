import { ItemTypes } from "./ItemTypes";
import { newId } from "../newId";

export class Claim implements iClaim {
    type: ItemTypes = 'claim'

    constructor(
        public content: string = "",
        public id: string = newId(),
        public reversible: boolean = false,
    ) {
    }
}

export interface iClaim {
    type: ItemTypes,
    id: string,
    reversible: boolean,
    /** allow for other properties by external implementations */
    [others: string]: any;
}


