import { Action } from "./dataModels/Action";
import { iCalculateScore } from "./calculateScore";
import { iRepository } from "./dataModels/iRepository";
/**
 * Calculates the score actions based on a list of actions
 */
export declare function calculateScoreActions({ actions, repository, calculator }?: {
    /** An array of actions, usually on claims or edges that incluse no scores*/
    actions?: Action[];
    /** The repository used to get context for the actions */
    repository?: iRepository;
    /** The function used to calculate the scores */
    calculator?: iCalculateScore;
}): Promise<Action[]>;
