import { Repository } from "../Repository";
import { GenerateExampleData } from "../dataModels/ExampleData";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { calculateScore } from "../calculateScore";
import { Id, ID } from "../dataModels/Id";
import { Score } from "../dataModels/Score";
import { groupScoresByScope, ScoresByScope } from "../groupScoresByScope";
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


