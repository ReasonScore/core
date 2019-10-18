import { CalculationInitator } from "../CalculationInitiator";
import { Change } from "../dataModels/Change";
import { Claim } from "../dataModels/Claim";
import { ID } from "../dataModels/Id";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Repository } from "../Repository";
import { Affects } from "../dataModels/Affects";


test('claim without any edges should have score of 1', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const claim = new Claim("Measured Claim", ID("0"));
    calcInitator.notify([
        new Change(claim),
    ]);
    expect(repo.getScoreBySourceClaimId(claim.id).sourceClaimId).toBe(claim.id);
    expect(repo.getScoreBySourceClaimId(claim.id).confidence).toBe(1);

});

test('claim with one con child should have confidence of -1', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("MeasuredClaim"));
    const childClaim = new Claim("Child Claim", ID("ChildClaim"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim),
        new Change(new ClaimEdge(measuredClaim.id,childClaim.id,Affects.Confidence,false)),
   ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(-1);
});

test('claim with two con descendants should have a confidence of 1', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim = new Claim("Child Claim", ID("childClaim"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id,childClaim.id,Affects.Confidence,false)),
        new Change(new ClaimEdge(childClaim.id,descendantClaim.id,Affects.Confidence,false)),
   ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(1);
    debugger;
});