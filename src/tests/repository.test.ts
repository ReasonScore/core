import { Repository } from "../Repository";
import { GenerateExampleData } from "../dataModels/ExampleData";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { calculateScore } from "../calculateScore";
import { Id, ID } from "../dataModels/Id";
import { Score } from "../dataModels/Score";
import { groupScoresByScope, ScoresByScope } from "../groupScoresByScope";

const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);
let repo = new Repository(JSON.parse(exampleDataJson));
let claimEdge42 = repo.getClaimEdge(ID("2-4    "));


test('Repository should have an edge between claim4 and claim2', () => {
    expect(claimEdge42.pro).toBe(false);
});

test('Check Score for 2:"The City 3000 Plan is worth the investment" with no scope', () => {
    const claimEdge2 = repo.getClaimEdge(ID("2      "));
    const scores = [
        repo.getScore(ID("2-3    ")),
        repo.getScore(ID("2-4    ")),
        repo.getScore(ID("2-5    ")),
    ];
    const result = calculateScore(
        scores,
        claimEdge2.pro,
        undefined,
        claimEdge2.reversable,
    )
    expect(result.confidence).toBe(1 / 3);
});

test('Check Score for 2:"The City 3000 Plan is worth the investment" with all scopes', () => {
    const claim = repo.getClaim(ID("2"));
    const claimEdges = repo.getClaimEdgesByParent(claim.id);
    const finalScores: Score[] = [];

    //Get all scopes
    const scopes: ScoresByScope = {};
    claimEdges.forEach((claimEdge) => {
        //Get all the scores for each child claim of this edge
        const claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
        groupScoresByScope(claimEdgeScores, claimEdge.parentId.toString(), scopes);
    });

    //For each scope, loop through and create a score
    Object.entries(scopes).forEach(([scopeIdString, scopeScores]) => {
        //ToDO: do we need to get any claims that are not in the current scope or do we assume they are all there?
        const newScore = calculateScore(scopeScores);
        newScore.scopeId = ID(scopeIdString);
        finalScores.push(newScore);
    });

    expect(finalScores[0].confidence).toBe(-1 / 3);
    expect(finalScores[1].confidence).toBe(-1 / 3);
    expect(finalScores[2].confidence).toBe(1 / 3);
    //debugger;
});


// interface ScoresByScope { [Id: string]: Score[] }//  | undefined }

// function groupScoresByScope(scores: Score[], parentId: string, ScoresByScope: ScoresByScope) {
//     scores.forEach(score => {
//         let idString: string;
//         if (score.scopeId != undefined) {
//             idString = score.scopeId.toString();
//         }
//         else {
//             idString = parentId;
//         }
//         if (ScoresByScope[idString] === undefined) {
//             ScoresByScope[idString] = [];
//         }
//         ScoresByScope[idString].push(score);
//     });
// }
// test('Switching 42 form con to pro should change scores', () => {
//     debugger;
//     let newClaimEdge42 = <ClaimEdge>deepClone(claimEdge42);
//     newClaimEdge42.pro = true;
//     repo.notify([new Change("", claimEdge42, newClaimEdge42)])
//     let testClaimEdge42 = repo.getclaimEdge("2-4    ");

//     expect(testClaimEdge42.pro).toBe(true);
// });
