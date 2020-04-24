import { Item } from "../dataModels/Item";
/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */
export function hasItemChanged(scoreA: Item, scoreB: Item) {
    return !(JSON.stringify(scoreA, Object.keys(scoreA).sort()) ===
        JSON.stringify(scoreB, Object.keys(scoreB).sort()));
}
