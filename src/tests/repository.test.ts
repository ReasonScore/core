import { Repository } from "../Repository";
import { GenerateExampleData } from "../dataModels/ExampleData";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { calculateScore } from "../calculateScore";
import { Id, ID } from "../dataModels/Id";

const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);
debugger;

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

// test('Switching 42 form con to pro should change scores', () => {
//     debugger;
//     let newClaimEdge42 = <ClaimEdge>deepClone(claimEdge42);
//     newClaimEdge42.pro = true;
//     repo.notify([new Change("", claimEdge42, newClaimEdge42)])
//     let testClaimEdge42 = repo.getclaimEdge("2-4    ");

//     expect(testClaimEdge42.pro).toBe(true);
// });
