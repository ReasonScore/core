import { Score } from "./Score"
import { Edge, Affects } from "./Edge"
/**
 * Calculates a new score based on the child scores and how thay wre linked (by edged) the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the children and scores into this array that are within scope.
 * @param childEdges - an array of edges (aka arguments) that link an individual child to the claim this score is for. 
 * @param childScores - an array of scores for child claims linked to the claim this score is for. This function does not take into account scopes. The caller of this fuction should only put the scores into this array that are within scope.
 * @param previousScore - The previous score for this claim which may be replaced by this new score (if there are different)
 */
export function calculateScore(claimId: string, childEdges: Edge[] = [], childScores: Score[] = []) {
    const newScore: Score = new Score(claimId);
    // ToDO: Removed the previous score. Comparisons and duplication of the previous score should be done in other places. This is so that the calcuations are as simple as possible. 
    // Loop through the child edges and determine the score of the parent. Many of the child properties are also filled out during this calcuation
    // If there are no children that affect the confidence of the claim then assume the claim is 100% confident and start strength at 1. No code necessary as this is the default of the object
    childEdges.forEach((childEdge) => {
        const childScore = childScores.filter(s => s.claimId === childEdge.childId)[0];

        // Process edges that affect confidence
        if (childEdge.affects === Affects.Confidence) {
            if (childEdge.reversable) {
                childScore.weight = childScore.score * childScore.relevance;
            } else {
                childScore.weight = Math.max(0, childScore.score) * childScore.relevance; // If the claim is not reversable and weight is below 0 then assume it is 0
            }
            newScore.childrenWeight += childScore.weight; // Add up all the weights of the children
            if (childEdge.pro) {
                childScore.strength = childScore.weight * childScore.score;
            } else {
                childScore.strength = childScore.weight * -childScore.score;
            }
            newScore.childrenStrength += childScore.strength; // Add up all the strength of the children
            childScore.displayText = `${Math.round(childScore.weight * 100)}%`;// * (edge.pro ? 1 : -1)}%`;
        }

        // Process Relevance child claims
        if (childEdge.affects === 'relevance') {
            if (childEdge.pro) {
                childScore.relevance = 1 + childScore.score;
            } else {
                childScore.relevance = 1 - (childScore.score / 2);
            }
            newScore.relevance *= childScore.relevance;
            childScore.displayText = `X${childScore.relevance}`;
        }
    });

    if (newScore.childrenWeight === 0) {
        // Protect against division by zero
        newScore.score = 0;
    } else {
        newScore.score = newScore.childrenStrength / newScore.childrenWeight;
    }

    newScore.displayText = `${Math.round(newScore.score * 100)}%`;

    return newScore;

}

