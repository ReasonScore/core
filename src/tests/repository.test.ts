import { Repository } from "../Repository";
import { GenerateExampleData } from "../dataModels/ExampleData";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { calculateScore } from "../calculateScore";
import { Id, ID } from "../dataModels/Id";
import { Score } from "../dataModels/Score";
import { ScoreAndClaimEdgesByScoreScopeId, GroupScoreAndClaimEdgesByScoreScopeIds } from "../GroupScoreAndClaimEdgesByScoreScopeIds";
import { ScoreAndClaimEdge } from "../dataModels/ScoreAndClaimEdge";
import { scoreDescendants } from "../ScoreDescendants";

const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);


// test('Repository should have an edge between claim4 and claim2', () => {
//     let repo = new Repository(JSON.parse(exampleDataJson));
//     let claimEdge42 = repo.getClaimEdge(ID("2-4    "));
//     expect(claimEdge42.pro).toBe(false);
// });

// test('Check Score for 2:"The City 3000 Plan is worth the investment" with no scope', () => {
//     let repo = new Repository(JSON.parse(exampleDataJson));
//     const scoreAndClaimEdges = [
//         new ScoreAndClaimEdge(
//             repo.getScore(ID("2-3    ")),
//             repo.getClaimEdge(ID("2-3    "))
//         ),
//         new ScoreAndClaimEdge(
//             repo.getScore(ID("2-4    ")),
//             repo.getClaimEdge(ID("2-4    "))
//         ),
//         new ScoreAndClaimEdge(
//             repo.getScore(ID("2-5    ")),
//             repo.getClaimEdge(ID("2-5    "))
//         ),
//     ];
//     const result = calculateScore(
//         scoreAndClaimEdges
//     )
//     expect(result.confidence).toBe(1 / 3);
// });

// test('Check Score for 2:"The City 3000 Plan is worth the investment" with all scopes', () => {
//     const finalScores: Score[] = [];
//     let repo = new Repository(JSON.parse(exampleDataJson));
//     const rootClaim = repo.getClaim(ID("2"));
//     const claimEdges = repo.getClaimEdgesByParentId(rootClaim.id);
//     const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];

//     claimEdges.forEach((claimEdge) => {
//         //Get all the scores for each child claim of this edge
//         //We assume all the scores exist
//         const claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
//         claimEdgeScores.forEach((score) => {
//             scoreAndClaimEdges.push(
//                 new ScoreAndClaimEdge(score, claimEdge)
//             );
//         });
//     });

//     const scoreAndClaimEdgesByScoreScopeIds = GroupScoreAndClaimEdgesByScoreScopeIds(scoreAndClaimEdges);

//     //For each scope, loop through and create a score
//     Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(([scopeIdString, scoreAndClaimEdge]) => {
//         //ToDO: do we need to get any claims that are not in the current scope or do we assume they are all there?
//         const newScore = calculateScore(scoreAndClaimEdge);
//         newScore.scopeId = ID(scopeIdString);
//         finalScores.push(newScore);
//     });

//     expect(finalScores[0].confidence).toBe(-1 / 3);
//     expect(finalScores[1].confidence).toBe(-1 / 3);
//     expect(finalScores[2].confidence).toBe(1 / 3);
// });

test('Calculate All - City 3000', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    repo.rsData.scores = [];
    scoreDescendants(repo, ID("0"));
    scoreDescendants(repo, ID("1"));
    debugger;

    expect(repo.getScorebyClaimIdAndScope(ID("6"), ID("0")).confidence).toBe(1);
    expect(repo.getScorebyClaimIdAndScope(ID("3"), ID("0")).confidence).toBe(-1);
    expect(repo.getScorebyClaimIdAndScope(ID("2"), ID("0")).confidence).toBe(-1 / 3);
    expect(repo.getScorebyClaimIdAndScope(ID("0"), ID("0")).confidence).toBe(-1 / 3);
    expect(repo.getScorebyClaimIdAndScope(ID("1"), ID("1")).confidence).toBe(-1 / 3);


    expect(repo.rsData.scores.length).toBe(18);
    // expect(repo.rsData.scores.length).toBe(16);
    // The below scores should not exist but maybe only if we know all the ancestors so we know that scope is never used again
    // 15: Score {confidence: -0.3333333333333333, relevance: 1, id: "YpFPGyHNvmcz", sourceClaimId: "0", scopeId: "1", …}
    // 16: Score {confidence: -0.3333333333333333, relevance: 1, id: "YpFPGyHp6c3s", sourceClaimId: "1", scopeId: "0", …}

});


