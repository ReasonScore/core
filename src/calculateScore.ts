import { Affects } from "./dataModels/Affects"
import { Score } from "./dataModels/Score";
import { Id, ID } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";

/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
 */
export function calculateScore({ scoreAndClaimEdges = [], reversible = true, sourceClaimId = ID("") }: {
    /** An array of grouped edges and claims*/
    scoreAndClaimEdges?: ScoreAndClaimEdge[];
    /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversible?: boolean;
    /** The ID of the claim we are creating a score for */
    sourceClaimId?: Id;
} = {},
) {
    const newScore: Score = new Score();
    let childrenConfidence = 0
    let childrenRelevance = 0

    if (scoreAndClaimEdges.filter(c => c.claimEdge.affects === Affects.Confidence).length < 1) {
        // If there are no children that affect the confidence of the claim
        // then assume the claim is 100% confident and start strength and relevance at 1
        childrenConfidence = 1;
        childrenRelevance = 1;
    }

    scoreAndClaimEdges.forEach(({score, claimEdge}) => {
        // Loop through the child scores and determine the score of the parent.
        if (claimEdge.affects === Affects.Confidence) {

            //calculate the reduction of the relevance bease on the distance of the confidence from zero
            //ToDO: maybe add a flag on the claimEdge to be able to turn this off in the case of a claim that should draw the parent towards zero
            //Like "This claim should require supporting evidence"
            let confidenceRelevanceAdjustment = 1
            confidenceRelevanceAdjustment = Math.abs(score.confidence)

            // Process edges that affect confidence
            if (claimEdge.pro) {
                childrenConfidence += score.confidence * score.relevance * confidenceRelevanceAdjustment; // Add up all the strength of the children
                childrenRelevance += score.relevance * confidenceRelevanceAdjustment; //Add up the relevance separately so we can do a weighted agerage later
            } else {
                childrenConfidence -= score.confidence * score.relevance * confidenceRelevanceAdjustment;
                childrenRelevance += score.relevance * confidenceRelevanceAdjustment;
            }
        }

        if (claimEdge.affects === 'relevance') {
            // Process Relevance child claims
            if (claimEdge.pro) {
                newScore.relevance += score.confidence; // Add up all the strength of the children
            } else {
                newScore.relevance -= score.confidence;
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

    if (!reversible && newScore.confidence < 0) {
        // If it is not reversible then do not let it go negative
        newScore.confidence = 0
    }

    if (Object.is(newScore.confidence, -0)) {
        // Protect against negative zero 
        newScore.confidence = 0;
    }

    if (sourceClaimId !== undefined) {
        newScore.sourceClaimId = sourceClaimId
    }


    return newScore;
}

