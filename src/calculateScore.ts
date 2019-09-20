import { Affects } from "./dataModels/Affects"
import { Score } from "./dataModels/Score";
import { Id, ID } from "./dataModels/Id";
import { ScoreAndClaimEdge } from "./dataModels/ScoreAndClaimEdge";

/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for.
 */
export function calculateScore(
    /**An array of grouped edges and claims*/
    scoreAndClaimEdges: ScoreAndClaimEdge[] = [],
    // /** Can this score fall below a 0 confidence (have a negative confidence) */
    reversable = true,
    sourceClaimId: Id = ID(""),
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

    scoreAndClaimEdges.forEach((scoreAndClaimEdge) => {
        // Loop through the child scores and determine the score of the parent.
        if (scoreAndClaimEdge.claimEdge.affects === Affects.Confidence) {
            // Process edges that affect confidence
            if (scoreAndClaimEdge.claimEdge.pro) {
                childrenConfidence += scoreAndClaimEdge.score.confidence * scoreAndClaimEdge.score.relevance; // Add up all the strength of the children
                childrenRelevance += scoreAndClaimEdge.score.relevance; //Add up the relevance separately so we can do a weighted agerage later
            } else {
                childrenConfidence -= scoreAndClaimEdge.score.confidence * scoreAndClaimEdge.score.relevance;
                childrenRelevance += scoreAndClaimEdge.score.relevance;
            }
        }

        if (scoreAndClaimEdge.claimEdge.affects === 'relevance') {
            // Process Relevance child claims
            if (scoreAndClaimEdge.claimEdge.pro) {
                newScore.relevance += scoreAndClaimEdge.score.confidence; // Add up all the strength of the children
            } else {
                newScore.relevance -= scoreAndClaimEdge.score.confidence;
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

    if (!reversable && newScore.confidence < 0) {
        // If it is not reversable then do not let it go negative
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

