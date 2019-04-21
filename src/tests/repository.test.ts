import { Repository } from "../Repository";
import { ExampleData } from "../ExampleData";

let repo = new Repository(ExampleData());

test('Repository should have an edge between claim4 and claim2', () => {
    let claimEdge42 = repo.rsData.claimEdges.find(e => e.parentId == "2" && e.childId == "4" && e.scopeId == "2");
    expect(claimEdge42 == undefined).toBe(false);
});