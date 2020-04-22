import { iScore, iScoreFragment } from "./dataModels/Score";

export interface iCalculateScore {
    ({ childScores }: {
        /** An array of grouped edges and claims*/
        childScores?: iScore[];
    }): iScoreFragment
}

/**
 * Calculates a new score based on the child scores passed in.
 */
export function calculateScore({ childScores = [], reversible = true }: {
    /** An array of grouped edges and claims*/
    childScores?: iScore[];
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversible?: boolean
} = {},
): iScoreFragment {

    const newScore: iScoreFragment = {
        confidence: 0,
        relevance: 1,
        childrenAveragingWeight: 0,
        childrenConfidenceWeight: 0,
        childrenRelevanceWeight: 0,
        childrenWeight: 0,
    };

    // let childrenConfidence = 0;
    // let childrenRelevance = 0;

    if (childScores.filter(s => s.affects === 'confidence').length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and relevance at 1
        newScore.confidence = 1;
        newScore.relevance = 1;
        newScore.childrenAveragingWeight = 1;
        newScore.childrenConfidenceWeight = 1;
        newScore.childrenRelevanceWeight = 1;
        newScore.childrenWeight = 1;
    }

    //Gather children Weights totals for processing further down
    debugger
    for (const childScore of childScores) {
        //Ensure calculations for non-reversible scores don't allow the confidence to be below 0
        //TODO: Is this needed in the totals seciton?
        let confidence = childScore.confidence
        if (!childScore.reversible && childScore.confidence < 0) {
            confidence = 0
        }

        childScore.weight = Math.abs(confidence) * childScore.relevance; // confidenceWeight * RelevanceWeight

        // @ts-ignore
        newScore.childrenAveragingWeight += 1;
        // @ts-ignore
        newScore.childrenConfidenceWeight += Math.abs(confidence);
        // @ts-ignore
        newScore.childrenRelevanceWeight += childScore.relevance;
        // @ts-ignore
        newScore.childrenWeight += childScore.weight;
    }

    // childScores.forEach(score => {
    //     //Ensure calculations for non-reversible scores don't allow the confidence to be below 0
    //     let confidence = score.confidence
    //     if (!score.reversible && score.confidence < 0) {
    //         confidence = 0
    //     }

    //     // Loop through the child scores and determine the score of the parent.
    //     if (score.affects === 'confidence') {

    //         //calculate the reduction of the relevance bease on the distance of the confidence from zero
    //         //TODO: maybe add a flag on the claimEdge to be able to turn this off in the case of a claim that should draw the parent towards zero
    //         //Like "This claim should require supporting evidence"
    //         let confidenceWeight = 1
    //         confidenceWeight = Math.abs(confidence)

    //         // Process edges that affect confidence
    //         if (score.pro) {
    //             childrenConfidence += confidence * score.relevance * confidenceWeight; // Add up all the strength of the children
    //             childrenRelevance += score.relevance * confidenceWeight; //Add up the relevance separately so we can do a weighted agerage later
    //         } else {
    //             childrenConfidence -= confidence * score.relevance * confidenceWeight;
    //             childrenRelevance += score.relevance * confidenceWeight;
    //         }
    //     }

    //     if (score.affects === 'relevance') {
    //         // Process Relevance child claims
    //         if (newScore.relevance == undefined) {
    //             newScore.relevance = 1;
    //         }
    //         if (score.pro) {
    //             newScore.relevance += confidence; // Add up all the strength of the children
    //         } else {
    //             newScore.relevance -= confidence / 2;
    //         }
    //     }
    // });

    // if (newScore.childrenRelevanceWeight === 0) {
    //     // Protect against division by zero
    //     newScore.confidence = 0;
    // } else {
    //     //Calculate the score
    //     // @ts-ignore
    //     newScore.confidence = newScore.childrenConfidenceWeight / newScore.childrenRelevanceWeight;
    // }

    // Loop through to calculate the final scores
    for (const childScore of childScores) {
        if (childScore.affects === "confidence") {
            if (newScore.childrenWeight === 0) {
                childScore.percentOfWeight = 0;
                newScore.confidence = 0;
            } else {
                // @ts-ignore
                childScore.percentOfWeight = childScore.weight / newScore.childrenWeight;

                if (childScore.pro) {
                    // @ts-ignore
                    newScore.confidence += childScore.percentOfWeight * childScore.confidence;
                } else {
                    // @ts-ignore
                    newScore.confidence -= childScore.percentOfWeight * childScore.confidence;
                }
            }
        }

        if (childScore.affects === "relevance") {
            // Process Relevance child claims

            let confidence = childScore.confidence
            if (!childScore.reversible && childScore.confidence < 0) {
                confidence = 0
            }

            if (newScore.relevance == undefined) {
                newScore.relevance = 1;
            }
            if (childScore.pro) {
                newScore.relevance += confidence;
            } else {
                newScore.relevance -= confidence / 2;
            }
        }
    }


    if (Object.is(newScore.confidence, -0)) {
        // Protect against negative zero 
        newScore.confidence = 0;
    }

    return newScore;
}

