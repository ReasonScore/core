import { Score } from "./Score"
import { Affects } from "./Affects"
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
 * This function does not take into account scopes.
 * The caller of this fuction should only put the children and scores into this array that are within scope.
 */
export function calculateScore(
    /** An array of scores for child claims linked to the claim this score is for. */
    childScores: Score[] = [],
    /** Is this score pro of it's parent (or false if it is a con) */
    pro = true,
    /** How does this score affect it's parent */
    affects = Affects.Confidence,
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversable = true
    ) {
    const newScore: Score = new Score();
    newScore.affects = affects;
    newScore.reversable = reversable
    let childrenConfidence = 0
    let childrenRelevance = 0

    //debugger;
    if (childScores.filter(cs => cs.affects === Affects.Confidence).length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and relevance at 1
        childrenConfidence = 1;
        childrenRelevance = 1;
    }

    childScores.forEach((childScore) => {
        // Loop through the child scores and determine the score of the parent.

        if (childScore.affects === Affects.Confidence) {
            // Process edges that affect confidence
            childrenConfidence += childScore.confidence * childScore.relevance; // Add up all the strength of the children
            childrenRelevance += childScore.relevance; //Add up the relevance separately so we can do a weighted agerage later
        }

        if (childScore.affects === 'relevance') {
            // Process Relevance child claims
            newScore.relevance += childScore.confidence; // Add up all the strength of the children
        }
    });

    if (childrenRelevance === 0) {
        // Protect against division by zero
        newScore.confidence = 0;
    } else {
        //Calculate the score
        newScore.confidence = childrenConfidence / childrenRelevance;
    }

    if (!reversable && newScore.confidence < 0) {
        // If it is not reversable then do not let it go negative
        newScore.confidence = 0
    }

    if (!pro) {
        // Reverse the score if it is a con
        newScore.confidence = -newScore.confidence;
    }

    if (Object.is(newScore.confidence, -0)) {
        // Protect against negative zero 
        newScore.confidence = 0;
    }

    return newScore;
}

