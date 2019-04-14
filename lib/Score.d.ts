/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 * @property {boolean} claimId - The ID of the claim this score is based on.
 * @property {boolean} reversable - If true, if the claim is proven false it will go into negative numbers (be reversed). If false it will stop at 0.
 * @property {boolean} scope - The ID of the claim that this score is scoped to.
 * @property {string} displayText - The score displayed in a short text. rounded to whole % for confidence or a multiplier or division for relevance.
 * @property {number} ChildrenWeight - The total summed weight of all the children scores
 * @property {number} childrenStrength - The total summed strength of all the children scores.
 * @property {number} relevance - How relevent this claim is to it's parent claim. Calculation: Pro: 1 + childScore.score, con: 1 - (childScore.score / 2). A multiplier set by all the child edges that affect 'relevance'. A multiplier set by all the child edges that affect 'relevance'. This is usually set during the calculation of it's parent score.
 * @property {number} score - strengthTotal / weightTotal. This is usually set during the calculation of it's parent score.
 * @property {number} weight - The final weight of this claim on it's parent. Calculation: score * relvance. This is usually set during the calculation of it's parent score.
 * @property {number} strength - The final strength of this claim on it's parent. Calculation: childScore.weight * +/-childScore.score. This is usually set during the calculation of it's parent score.
 */
export declare class Score {
    claimId: string;
    relevance: number;
    childrenStrength: number;
    childrenWeight: number;
    score: number;
    weight: number;
    strength: number;
    displayText: string;
    constructor(claimId: string);
}
