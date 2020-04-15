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
        confidence: 1,
        relevance: 1,
    };

    let childrenConfidence = 0
    let childrenRelevance = 0

    if (childScores.filter(s => s.affects === 'confidence').length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and relevance at 1
        childrenConfidence = 1;
        childrenRelevance = 1;
    }

    childScores.forEach(score => {
        //Ensure calculations for non-reversible scores don't allow the confident to be below 0
        let confidence = score.confidence
        if (!score.reversible && score.confidence < 0) {
            confidence = 0
        }
debugger
        // Loop through the child scores and determine the score of the parent.
        if (score.affects === 'confidence') {

            //calculate the reduction of the relevance bease on the distance of the confidence from zero
            //TODO: maybe add a flag on the claimEdge to be able to turn this off in the case of a claim that should draw the parent towards zero
            //Like "This claim should require supporting evidence"
            let confidenceRelevanceAdjustment = 1
            confidenceRelevanceAdjustment = Math.abs(confidence)

            // Process edges that affect confidence
            if (score.pro) {
                childrenConfidence += confidence * score.relevance * confidenceRelevanceAdjustment; // Add up all the strength of the children
                childrenRelevance += score.relevance * confidenceRelevanceAdjustment; //Add up the relevance separately so we can do a weighted agerage later
            } else {
                childrenConfidence -= confidence * score.relevance * confidenceRelevanceAdjustment;
                childrenRelevance += score.relevance * confidenceRelevanceAdjustment;
            }
        }

        if (score.affects === 'relevance') {
            // Process Relevance child claims
            if (newScore.relevance == undefined) {
                newScore.relevance = 1;
            }
            if (score.pro) {
                newScore.relevance += confidence; // Add up all the strength of the children
            } else {
                newScore.relevance -= confidence / 2;
            }
        }
    });

    if (childrenRelevance === 0) {
        // Protect against division by zero
        newScore.confidence = 0;
    } else {
        //Calculate the score
        newScore.confidence = childrenConfidence / childrenRelevance;
    }

    if (Object.is(newScore.confidence, -0)) {
        // Protect against negative zero 
        newScore.confidence = 0;
    }

    return newScore;
}

