import { Score } from "./dataModels/Score";

export interface iCalculateScore {
    ({ childScores }: {
        /** An array of grouped edges and claims*/
        childScores?: Score[];
    }): Partial<Score>
}

/**
 * Calculates a new score based on the child scores passed in.
 */
export function calculateScore({ childScores = [], reversible = true }: {
    /** An array of grouped edges and claims*/
    childScores?: Score[];
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversible?: boolean
} = {},
): Partial<Score> {
    // TODO: Simplify all this math and maybe break it up between base functionality and additional scoring (like the points)
    const newScore: Partial<Score> = {};
    newScore.confidence = 0;
    newScore.relevance = 1;
    newScore.childrenAveragingWeight = 0;
    newScore.childrenConfidenceWeight = 0;
    newScore.childrenRelevanceWeight = 0;
    newScore.childrenWeight = 0;
    // newScore.childrenProWeight = 0;
    // newScore.childrenConWeight = 0;


    if (childScores.filter(s => s.affects === 'confidence').length < 1) {
        // Defaults if there are no children
        newScore.confidence = 1; // assume 100% confident
        newScore.relevance = 1; // assume 100% relevant
        newScore.childrenAveragingWeight = 1;
        newScore.childrenConfidenceWeight = 1;
        newScore.childrenRelevanceWeight = 1;
        newScore.childrenWeight = 1;
    }

    //Gather children Weights totals for processing further down
    for (const childScore of childScores) {
        //Ensure calculations for non-reversible scores don't allow the confidence to be below 0
        //TODO: Is this needed in the totals seciton?
        let confidence = childScore.confidence
        if (!childScore.reversible && childScore.confidence < 0) {
            confidence = 0
        }

        childScore.weight = Math.abs(confidence) * childScore.relevance; // confidenceWeight * RelevanceWeight
        newScore.childrenAveragingWeight += 1;
        newScore.childrenConfidenceWeight += Math.abs(confidence);
        newScore.childrenRelevanceWeight += childScore.relevance;
        newScore.childrenWeight += childScore.weight;

        // //TODO: Experimantal
        // if (confidence > 0) {
        //     if (childScore.pro) {
        //         newScore.childrenProWeight += confidence
        //     }
        //     if (!childScore.pro) {
        //         newScore.childrenConWeight += confidence
        //     }
        // } else if (confidence < 0) {
        //     if (childScore.pro) {
        //         newScore.childrenConWeight += confidence
        //     }
        //     if (!childScore.pro) {
        //         newScore.childrenProWeight += confidence
        //     }
        // }
    }

    // Loop through to calculate the final scores
    for (const childScore of childScores) {
        const polarity = childScore.pro ? 1 : -1

        if (childScore.affects === "confidence") {
            if (newScore.childrenWeight === 0) {
                childScore.percentOfWeight = 0;
                newScore.confidence = 0;
            } else {

                childScore.percentOfWeight =
                    childScore.weight /
                    // @ts-ignore
                    newScore.childrenWeight;

                // @ts-ignore
                newScore.confidence +=
                    childScore.percentOfWeight *
                    childScore.confidence * polarity;
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

        let confidence = childScore.confidence
        if (!childScore.reversible && childScore.confidence < 0) {
            confidence = 0
        }
        // if (childScore.pro) {
        //     childScore.percentAgreeWeight = confidence / newScore.childrenProWeight
        // } else {
        //     childScore.percentAgreeWeight = confidence / newScore.childrenConWeight
        // }
    }


    if (Object.is(newScore.confidence, -0)) {
        // Protect against negative zero 
        newScore.confidence = 0;
    }

    return newScore;
}

