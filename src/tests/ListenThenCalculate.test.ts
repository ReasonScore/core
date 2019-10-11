import { Repository } from "../Repository";
import { CalculationLooper } from "../CalculationLooper";
import { Change } from "../dataModels/Change";
import { Claim } from "../dataModels/Claim";
import { ID } from "../dataModels/Id";
import { ClaimEdge } from "../dataModels/ClaimEdge";


test('City 3000 1 level scope', () => {
    const repo = new Repository();
    const calculationLoop = new CalculationLooper(repo);

    calculationLoop.notify([
        new Change(new Claim("Measured Claim", ID("0"))),
        new Change(new Claim("Con with scope of X", ID("1"))),
        new Change(new ClaimEdge(ID("0"), ID("1"), ID("X"), undefined, false, ID("1-X"))),
        new Change(new Claim("Con with scope of Y", ID("2"))),
        new Change(new ClaimEdge(ID("0"), ID("2"), ID("Y"), undefined, false, ID("2-Y"))),
    ]);
    expect(repo.getScoreByClaimIdAndScope(ID("0"), ID("X")).confidence).toBe(-1);
    expect(repo.getScoreByClaimIdAndScope(ID("0"), ID("Y")).confidence).toBe(-1);
    expect(repo.getScoreByClaimIdAndScope(ID("0"), ID("0")).confidence).toBe(1);

    //Add one with a scope of x to the top and see if it gets the 0 scope or the x scope
    calculationLoop.notify([
        new Change(new Claim("Top X Scope Claim", ID("-1"))),
        new Change(new ClaimEdge(ID("-1"), ID("0"), ID("X"), undefined, true, ID("2-Y"))),
    ]);
    debugger;
    expect(repo.getScoreByClaimIdAndScope(ID("-1"), ID("X")).confidence).toBe(-1);
    expect(repo.getScoreByClaimIdAndScope(ID("-1"), ID("-1")).confidence).toBe(-1);
});



// test('City 300 listen to changes then calculate', () => {
//     const repo = new Repository();
//     const calculationLoop = new CalculationLooper(repo);

//     calculationLoop.notify([new Change(new Claim("test", ID("2")))]);
//     expect(repo.getScoreByClaimIdAndScope(ID("2"), ID("2")).confidence).toBe(1);

//     calculationLoop.notify([new Change(new Claim("The City 3000 Plan is worth the investment", ID("2")))]);
//     expect(repo.items["2"].length).toBe(2);

//     calculationLoop.notify([
//         new Change(new Claim("The City 3000 plan is expensive", ID("4"))),
//         new Change(new ClaimEdge(ID("2"), ID("4"), ID("2"), undefined, false, ID("2-4"))),
//     ]);

//     expect(repo.getScoresByClaimId(ID("2"))[0].confidence).toBe(-1);

//     calculationLoop.notify([
//         new Change(new Claim("Bike lanes benefit residents", ID("3"))),
//         new Change(new ClaimEdge(ID("2"), ID("3"), ID("2"), undefined, true, ID("2-3"))),
//     ]);

//     expect(repo.getScoresByClaimId(ID("2"))[0].confidence).toBe(0);

//     debugger;
//     calculationLoop.notify([
//         new Change(new Claim("Arctic City Should Implement the City 3000 plan", ID("0"))),
//         new Change(new Claim("Bikes are not recommended in minus 30 degree weather", ID("6"))),
//         new Change(new Claim("Subways benefit residents", ID("5"))),
//         new Change(new ClaimEdge(ID("0"), ID("2"), ID("0"), undefined, true, ID("0-2"))),
//         new Change(new ClaimEdge(ID("2"), ID("5"), ID("2"), undefined, false, ID("0-2-3-5"))),
//         new Change(new ClaimEdge(ID("3"), ID("6"), ID("0"), undefined, false, ID("0-2-3-6"))),
//     ]);

//     //TODO: Remove later: this tests manually propogating hte change up the stack
//     calculationLoop.notify([
//         new Change(new ClaimEdge(ID("2"), ID("3"), ID("0"), undefined, true, ID("0-2-3"))),
//         new Change(new ClaimEdge(ID("0"), ID("2"), ID("0"), undefined, true, ID("0-2"))),
//     ]);

//     //expect(repo.getScoresByClaimId(ID("2"))[0].confidence).toBe(0);
//     debugger;
//     expect(repo.getScoresByClaimId(ID("0"))[0].confidence).toBe(-1 / 3);

// });





