import { Repository } from "../Repository";
import { GenerateExampleData } from "./ExampleData";
import { deepClone } from "../utils/deepClone";
import { Change } from "../dataModels/Change";
import { ID } from "../dataModels/Id";
import { Type } from "../dataModels/Type";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { scoreDescendants } from "../ScoreDescendants";


const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);

test('City 300 listen to changes then calculate', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    const changeLog: Change[][] = [];

    repo.subscribe((changes:Change[]) => {
        changeLog.push(changes);
        for (const change of changes) {
            if (change.newItem.type == Type.claimEdge) {
                const claimEdge = <ClaimEdge>change.newItem;
                scoreDescendants(repo, claimEdge.parentId)
            }
            if (change.newItem.type == Type.score) {

            }
        }
    })

    //Pre-Check that data matches]
    const pre_score5_1 = repo.getScorebyClaimIdAndScope(ID("5"),ID("1"))
    expect(pre_score5_1.confidence).toBe(-1);

    //CHange Data
    const claimEdge7 = repo.getClaimEdgesByParentId(ID("5"))[0];
    const claimEdge7_2 = deepClone(claimEdge7);
    claimEdge7_2.pro = true;
    repo.notify([new Change(claimEdge7_2,claimEdge7)]);

    //Verify Changes
    debugger;
    expect(changeLog.length).toBe(2);

    const testClaimEdge = repo.getClaimEdgesByParentId(ID("5"))[0];
    expect(testClaimEdge.pro).toBe(true);

    const score5_1 = repo.getScorebyClaimIdAndScope(ID("5"),ID("1"))
    expect(score5_1.confidence).toBe(1);
});





