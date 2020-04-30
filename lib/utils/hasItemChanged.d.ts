import { Item } from "../dataModels/Item";
import { Action } from "../dataModels/Action";
import { ActionTypes } from "..";
/** Compare two scores to see if they are different in what the score is.
 *  Just compares confidence and relavance
 */
export declare function hasItemChanged(scoreA: Item, scoreB: Item): boolean;
/** Compares two data objects and create apropriate change objects if necessary
 * If a property exists on old but not new, it is ignored as the new can be a partial and is not expected to have everything
 * If the propert exists on the new but not the old. It retunrs the property on the partialNewItem object
 * If the property exists on both items and has the same value, it is ignored
 * If the property exists on both items but the value differs, it is added to both partials in the return
 * If no changes are detected then undefined is returned so it can be easily checked.
 */
export declare function itemChanges(newItem: any, oldItem: any): {
    partialNewItem: any;
    partialOldItem: any;
} | undefined;
export declare function pushActionIfChanged(actions: Action[], newItem: any, OldItem: any, type: ActionTypes, itemId?: string): void;
