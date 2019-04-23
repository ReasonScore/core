import { Repository } from "../Repository";
import { ExampleData, GenerateExampleData } from "../dataModels/ExampleData";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";

let repo = new Repository(ExampleData());
let claimEdge42 = repo.getclaimEdge("2-4");


test.skip('Repository should have an edge between claim4 and claim2', () => {
    expect(claimEdge42.pro).toBe(false);
});

test('Switching 42 form con to pro should change scores', () => {
    debugger;
    let newClaimEdge42 = <ClaimEdge>deepClone(claimEdge42);
    newClaimEdge42.pro = true;
    repo.notify([new Change("", claimEdge42, newClaimEdge42)])
    let testClaimEdge42 = repo.getclaimEdge("2-4");

    expect(testClaimEdge42.pro).toBe(true);
});
