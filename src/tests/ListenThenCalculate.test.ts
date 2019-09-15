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

test('City 300 listen to changes then calculate', () => {
    let repo = new Repository(JSON.parse(exampleDataJson));
    const changeLog: Change[][] = [];

    repo.subscribe((changes:Change[]) => {
        changeLog.push(changes);
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





