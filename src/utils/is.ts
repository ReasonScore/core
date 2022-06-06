import { Item, Score } from "..";

export function isScore(item: Item): item is Score {
    return item.type === "score"
}