import { Id } from "./Id";
import { Type } from "./Type";

export interface Item {
    id: Id
    version: Id
    type: Type
    start: string
    end: string
}