import { Score } from "./dataModels/Score";
import { Action } from "./dataModels/Action";
import { PureRepository } from "./PureRepository";
import { iCalculateScore, calculateScore } from "./calculateScore";
import { Claim } from "./dataModels/Claim";
import { iRepository } from "./dataModels/iRepository";

/**
 * Calculates the score actions based on a list of actions
 */
export async function calculateScores({ actions = [] , repository = new PureRepository(), calculator = calculateScore }: {
    /** An array of actions, usually on claims or edges that incluse no scores*/
    actions?: Action[];
    /** The repository used to get context for the actions */
    repository?: iRepository;
    /** The function used to calculate the scores */
    calculator?: iCalculateScore;
} = {},
) {
    const scoreActions: Action[] = [];

    await repository.notify(actions);

    for (const action of actions) {

        // calculate scores from a new claim
        if (action.type == 'add_claim' ) {
            const claim = action.newData as Claim;
            const score = calculator({sourceClaimId: claim.id});
            scoreActions.push( new Action(score, {}, "add_score", score.id))
        }
    }

    return scoreActions;
}

