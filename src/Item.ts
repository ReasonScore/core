import { Type } from "./Type";

export interface Item {
    id: string
    version: string
    type: Type
    start: Date
    end: Date
}