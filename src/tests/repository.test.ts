import { Repository } from "../Repository";
import { GenerateExampleData } from "../dataModels/ExampleData";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { calculateScore } from "../calculateScore";
import { Id, ID } from "../dataModels/Id";
import { Score } from "../dataModels/Score";
import { ScoreAndClaimEdgesByScoreScopeId, FindScopes } from "../FindScopes";
import { ScoreAndClaimEdge } from "../dataModels/ScoreAndClaimEdge";
import { scoreDescendants } from "../ScoreDescendants";

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

test('FindScopes', () => {
    const finalScores: Score[] = [];
    let repo = new Repository(JSON.parse(exampleDataJson));
    const rootClaim = repo.getClaim(ID("2"));
    const claimEdges = repo.getClaimEdgesByParentId(rootClaim.id);
    const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];

    claimEdges.forEach((claimEdge) => {
        //Get all the scores for each child claim of this edge
        //We assume all the scores exist
        const claimEdgeScores = repo.getScoresbyClaimId(claimEdge.childId);
        claimEdgeScores.forEach((score) => {
            scoreAndClaimEdges.push(
                new ScoreAndClaimEdge(score, claimEdge)
            );
        });
    });

    const scoreAndClaimEdgesByScoreScopeIds = FindScopes(scoreAndClaimEdges);

    debugger;
    expect(scoreAndClaimEdgesByScoreScopeIds["0"].length).toBe(0);
    expect(scoreAndClaimEdgesByScoreScopeIds["1"].length).toBe(0);
    expect(scoreAndClaimEdgesByScoreScopeIds["2"].length).toBe(0);
});

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
    // The below scores should not exist but maybe only if we know all the ancestors so we know that scope is never used again
    // expect(repo.rsData.scores.length).toBe(16);
    // 15: Score {confidence: -0.3333333333333333, relevance: 1, id: "YpFPGyHNvmcz", sourceClaimId: "0", scopeId: "1", …}
    // 16: Score {confidence: -0.3333333333333333, relevance: 1, id: "YpFPGyHp6c3s", sourceClaimId: "1", scopeId: "0", …}

});


