import { Id } from "./Id";

export interface Item {
    id: Id
    version: Id
    type: string
    start: string
    end: string
}