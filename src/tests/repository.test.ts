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

const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);


test('Repository should have an edge between claim4 and claim2', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    let claimEdge42 = repo.getClaimEdge(ID("2-4    "));
    expect(claimEdge42.pro).toBe(false);
});

test('Check Score for 2:"The City 3000 Plan is worth the investment" with no scope', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    const scoreAndClaimEdges = [
        new ScoreAndClaimEdge(
            repo.getScore(ID("2-3    ")),
            repo.getClaimEdge(ID("2-3    "))
        ),
        new ScoreAndClaimEdge(
            repo.getScore(ID("2-4    ")),
            repo.getClaimEdge(ID("2-4    "))
        ),
        new ScoreAndClaimEdge(
            repo.getScore(ID("2-5    ")),
            repo.getClaimEdge(ID("2-5    "))
        ),
    ];
    const result = calculateScore(
        scoreAndClaimEdges
    )
    expect(result.confidence).toBe(1 / 3);
});

test('Check Score for 2:"The City 3000 Plan is worth the investment" with all scopes', () => {
    const finalScores: Score[] = [];
    let repo = new Repository(JSON.parse(exampleDataJson));
    const rootClaim = repo.getClaim(ID("2"));
    const claimEdges = repo.getClaimEdgesByParentId(rootClaim.id);
    const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];

    claimEdges.forEach((claimEdge) => {
        //Get all the scores for each child claim of this edge
        const claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
        claimEdgeScores.forEach((score) => {
            scoreAndClaimEdges.push(
                new ScoreAndClaimEdge(score, claimEdge)
            );
        });
    });

    //Move to 
    const scoreAndClaimEdgesByScoreScopeIds = GroupScoreAndClaimEdgesByScoreScopeIds(scoreAndClaimEdges);

    //For each scope, loop through and create a score
    Object.entries(scoreAndClaimEdgesByScoreScopeIds).forEach(([scopeIdString, scoreAndClaimEdge]) => {
        //ToDO: do we need to get any claims that are not in the current scope or do we assume they are all there?
        const newScore = calculateScore(scoreAndClaimEdge);
        newScore.scopeId = ID(scopeIdString);
        finalScores.push(newScore);
    });
    debugger;

    expect(finalScores[0].confidence).toBe(-1 / 3);
    expect(finalScores[1].confidence).toBe(-1 / 3);
    expect(finalScores[2].confidence).toBe(1 / 3);
});

test('Calculate All - City 3000', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    repo.rsData.scores = [];
    //scoreChildren(repo, ID("0"))
});


// //***********Need to completely rethink this***************************************
// /*function scoreChildren(repo: Repository, parentId: Id): void {
//     //ToDO: check to see if a score exists before you calculate
//     //debugger;
//     const claimEdges = repo.getClaimEdgesByParent(parentId);
//     const scopes: ScoresByScope = {};
//     if (claimEdges.length == 0) {
//         const newScore = calculateScore();
//         newScore.sourceClaimId = parentId;
//         repo.rsData.scores.push(newScore);
//     } else {
//         //debugger;
//         claimEdges.forEach((claimEdge) => {
//             //Get all the scores for each child claim of this edge
//             scoreChildren(repo, claimEdge.childId);
//             const claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
//             groupScoresByScope(claimEdgeScores, claimEdge.parentId.toString(), scopes);
//         });
//         Object.entries(scopes).forEach(([scopeIdString, scopeScores]) => {
//             debugger;
//             const newScore = calculateScore(scopeScores,);
//             newScore.sourceClaimId = ID(scopeIdString);
//             repo.rsData.scores.push(newScore);
//         });
//     }
// }
// */

// // test('Switching 42 form con to pro should change scores', () => {
// //     debugger;
// //     let newClaimEdge42 = <ClaimEdge>deepClone(claimEdge42);
// //     newClaimEdge42.pro = true;
// //     repo.notify([new Change("", claimEdge42, newClaimEdge42)])
// //     let testClaimEdge42 = repo.getclaimEdge("2-4    ");

// //     expect(testClaimEdge42.pro).toBe(true);
// // });
