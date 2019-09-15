import { Repository } from "../Repository";
import { GenerateExampleData } from "./ExampleData";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { ID } from "../dataModels/Id";


const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);

test('City 300 listen to changes then calculate', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    const changeLog: Change[][] = [];

    repo.subscribe((changes:Change[]) => {
        changeLog.push(changes);

        //trigger Calculate scores down?

        //trigger Calculate Scores Up?
    })

    const claimEdge7 = repo.getClaimEdgesByParentId(ID("5"))[0];
    const claimEdge7_2 = deepClone(claimEdge7);
    claimEdge7_2.pro = true;
    repo.notify([new Change(claimEdge7_2,claimEdge7)]);

    expect(changeLog.length).toBe(1);
    debugger;
    const testClaimEdge = repo.getClaimEdgesByParentId(ID("5"))[0];
    expect(testClaimEdge.pro).toBe(true);
});





