import { ItemTypes } from "./ItemTypes";
import { Item } from "./Item";
export declare class Claim implements Item {
    content: string;
    id: string;
    reversible: boolean;
    labelMax?: string | undefined;
    labelMid?: string | undefined;
    labelMin?: string | undefined;
    type: ItemTypes;
    constructor(content?: string, id?: string, reversible?: boolean, labelMax?: string | undefined, labelMid?: string | undefined, labelMin?: string | undefined);
}
