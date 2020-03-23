/**
 * How a child claim affects a parent claim
 */
export type ActionTypes =
    "add_claim" |
    "modify_claim" |
    "delete_claim" |

    "add_claimEdge" |
    "modify_claimEdge" |
    "delete_claimEdge"|

    "add_score" |
    "modify_score" |
    "delete_score"

    //TODO: do we need scoreTree? I guess just to keep a list of the tops. We could also just record any new scores without parents.
    // "add_scoretree" |
    // "delete_scoretree"
