import { Score } from "./Score"
import { Affects } from "./Affects"
import { objectExpression } from "@babel/types";
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the children and scores into this array that are within scope.
 * @param childEdges - an array of edges (aka arguments) that link an individual child to the claim this score is for. 
 * @param childScores - an array of scores for child claims linked to the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the scores into this array that are within scope.
 * @param previousScore - The previous score for this claim which may be replaced by this new score (if there are different)
 */
export function calculateScore(childScores: Score[] = [], pro = true, affects = Affects.Confidence, reversable = true) {
    const newScore: Score = new Score(affects, reversable);
    let childrenConfidence = 0
    let childrenRelevance = 0

    //debugger;
    if (childScores.filter(cs => cs.affects === Affects.Confidence).length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and weight at 1
        childrenConfidence = 1;
        childrenRelevance = 1;
    }

    childScores.forEach((childScore) => {
        // Loop through the child scores and determine the score of the parent.

        if (childScore.affects === Affects.Confidence) {
            // Process edges that affect confidence
            childrenConfidence += childScore.score * childScore.relevance; // Add up all the strength of the children
            childrenRelevance += childScore.relevance;
        }

        if (childScore.affects === 'relevance') {
            // Process Relevance child claims
            newScore.relevance += childScore.score; // Add up all the strength of the children
        }
    });

    if (childrenRelevance === 0) {
        // Protect against division by zero
        newScore.score = 0;
    } else {
        //Calculate the score
        newScore.score = childrenConfidence / childrenRelevance;
    }

    if (!reversable && newScore.score < 0) {
        // If it is not reversable then do not let it go negative
        newScore.score = 0
    }

    if (!pro) {
        // Reverse the score if it is a con
        newScore.score = -newScore.score;
    }

    if (Object.is(newScore.score, -0)) {
        // Protect against negative zero 
        newScore.score = 0;
    }

    return newScore;
}

