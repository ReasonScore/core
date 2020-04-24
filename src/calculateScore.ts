import { iScore} from "./dataModels/Score";

export interface iCalculateScore {
    ({ childScores }: {
        /** An array of grouped edges and claims*/
        childScores?: iScore[];
    }): Partial<iScore>
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
): Partial<iScore> {
    // TODO: Simplify all this math and maybe break it up between base functionality and additional scoring (like the points)
    const newScore: Partial<iScore> = {
        confidence: 0,
        relevance: 1,
        childrenAveragingWeight: 0,
        childrenConfidenceWeight: 0,
        childrenRelevanceWeight: 0,
        childrenWeight: 0,
        childrenPointsPro: 0,
        childrenPointsCon: 0,
    };

    if (childScores.filter(s => s.affects === 'confidence').length < 1) {
        // Defaults if there are no children
        newScore.confidence = 1; // assume 100% confident
        newScore.relevance = 1; // assume 100% relevant
        newScore.childrenAveragingWeight = 1;
        newScore.childrenConfidenceWeight = 1;
        newScore.childrenRelevanceWeight = 1;
        newScore.childrenWeight = 1;
        newScore.childrenPointsPro = 1;
        newScore.childrenPointsCon = 0;
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
        // @ts-ignore
        newScore.childrenAveragingWeight += 1;
        // @ts-ignore
        newScore.childrenConfidenceWeight +=
            Math.abs(confidence);
        // @ts-ignore
        newScore.childrenRelevanceWeight +=
            childScore.relevance;
        // @ts-ignore
        newScore.childrenWeight +=
            childScore.weight;
    }

    // Loop through to calculate the final scores
    for (const childScore of childScores) {
        const polarity = childScore.pro ? 1 : -1

        if (childScore.affects === "confidence") {
            if (newScore.childrenWeight === 0) {
                childScore.percentOfWeight = 0;
                newScore.confidence = 0;
            } else {

                // @ts-ignore
                childScore.percentOfWeight =
                    childScore.weight /
                    // @ts-ignore
                    newScore.childrenWeight;

                // @ts-ignore
                newScore.confidence +=
                    childScore.percentOfWeight *
                    childScore.confidence * polarity;

                if (childScore.pro) {
                    childScore.pointsPro = childScore.childrenPointsPro * childScore.percentOfWeight;
                    childScore.pointsCon = childScore.childrenPointsCon * childScore.percentOfWeight;
                } else {
                    childScore.pointsPro = childScore.childrenPointsCon * childScore.percentOfWeight;
                    childScore.pointsCon = childScore.childrenPointsPro * childScore.percentOfWeight;
                }

                // @ts-ignore
                newScore.childrenPointsPro +=
                    childScore.pointsPro;
                // @ts-ignore
                newScore.childrenPointsCon +=
                    childScore.pointsCon;
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

