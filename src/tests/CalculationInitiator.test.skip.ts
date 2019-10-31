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

test('claim with two con descendants should have a confidence of 0', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(childClaim1.id, descendantClaim.id, Affects.Confidence, false)),
    ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(0);
});

test('claim with two con descendants and other children should have a confidence of 1', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    const childClaim2 = new Claim("Child Claim 2", ID("childClaim2"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(measuredClaim.id, childClaim2.id, Affects.Confidence, true)),
        new Change(new ClaimEdge(childClaim1.id, descendantClaim.id, Affects.Confidence, false)),
    ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(1);
});

test('Multiple children calculation', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    const childClaim2 = new Claim("Child Claim 2", ID("childClaim2"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(childClaim2),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(measuredClaim.id, childClaim2.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(childClaim1.id, descendantClaim.id, Affects.Confidence, false)),
    ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(0);
});

test('Default Not Reversable', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
    ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(0);
});

test('Reversable', () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"), undefined, undefined, undefined, true);
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
    ]);
    expect(repo.getScoreBySourceClaimId(measuredClaim.id).confidence).toBe(-1);
});