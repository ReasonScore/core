import { Item } from "../dataModels/Item";
/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */
export declare function hasItemChanged(scoreA: Item, scoreB: Item): boolean;
