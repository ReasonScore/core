import { Repository } from "../Repository";
import { GenerateExampleData } from "./ExampleData";
import { Messenger } from "../Messenger";
import { CalculationLooper } from "../CalculationLooper";
import { Change } from "../dataModels/Change";
import { Claim } from "../dataModels/Claim";
import { ID } from "../dataModels/Id";
import { ClaimEdge } from "../dataModels/ClaimEdge";


const exampleDataJson = JSON.stringify(GenerateExampleData(), undefined, 2);

test('City 300 listen to changes then calculate', () => {
    const repo = new Repository();
    const calculationLoop = new CalculationLooper(repo);

    calculationLoop.notify([new Change(new Claim("test", ID("2")))]);
    expect(repo.getScoreByClaimIdAndScope(ID("2"), ID("2")).confidence).toBe(1);

    calculationLoop.notify([new Change(new Claim("The City 3000 Plan is worth the investment                            ", ID("2")))]);
    expect(repo.items["2"].length).toBe(2);

    calculationLoop.notify([
        new Change(
            new Claim("The City 3000 plan is expensive                                       ", ID("4")),
        ),
        new Change(
            new ClaimEdge(ID("2"), ID("4"), ID("2"), undefined, false, ID("2-4    ")),
        ),
    ]);

    debugger;
    expect(repo.getScoresByClaimId(ID("2"))[0].confidence).toBe(-1);



});





