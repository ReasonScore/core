import { CalculationInitator } from "../CalculationInitiator";
import { Change } from "../dataModels/Change";
import { Claim } from "../dataModels/Claim";
import { ID, Id } from "../dataModels/Id";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Repository } from "../Repository";
import { Affects } from "../dataModels/Affects";
import { newId, Messenger } from "..";
import { Score } from "../dataModels/Score";

const getScore = async (repo: Repository, id: Id) => {
    let score = await repo.getScoreBySourceClaimId(id)
    if (score) {
        return score;
    } else {
        return new Score();
    }
}

test('claim without any edges should have score of 1', async () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const claim = new Claim("Measured Claim", ID("0"));
    await calcInitator.notify([
        new Change(claim),
    ]);
    expect((await getScore(repo,claim.id)).sourceClaimId).toBe(claim.id);
    expect((await  getScore(repo,claim.id)).confidence).toBe(1);
    expect(repo.log.length).toBe(2);

});

test('claim with two con descendants should have a confidence of 0', async () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    await calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(childClaim1.id, descendantClaim.id, Affects.Confidence, false)),
    ]);
    debugger;
    expect((await getScore(repo,measuredClaim.id)).confidence).toBe(0);
});

test('claim with two con descendants and other children should have a confidence of 1', async () => {
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
    expect((await getScore(repo,measuredClaim.id)).confidence).toBe(1);
});

test('Multiple children calculation', async () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    const childClaim2 = new Claim("Child Claim 2", ID("childClaim2"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    await calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(childClaim2),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(measuredClaim.id, childClaim2.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(childClaim1.id, descendantClaim.id, Affects.Confidence, false)),
    ]);
    expect((await getScore(repo,measuredClaim.id)).confidence).toBe(0);
});

test('Multiple children calculation with no scores', async () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    const childClaim2 = new Claim("Child Claim 2", ID("childClaim2"));
    const descendantClaim = new Claim("Descendant Claim", ID("descendantClaim"));
    await calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(childClaim2),
        new Change(descendantClaim),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(measuredClaim.id, childClaim2.id, Affects.Confidence, false)),
        new Change(new ClaimEdge(childClaim1.id, descendantClaim.id, Affects.Confidence, false)),
    ]);
    //Delete all scores
     repo.rsData.scoreBySourceClaimId = {};

    //Ask for score form CalculationInitator
    debugger;
    expect((await calcInitator.CalculateByClaimId(measuredClaim.id)).confidence).toBe(0);
});

test('Default Not Reversible', async () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"));
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    await calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
    ]);
    expect((await getScore(repo,measuredClaim.id)).confidence).toBe(0);
});

test('Reversible', async () => {
    const repo = new Repository();
    const calcInitator = new CalculationInitator(repo);
    const measuredClaim = new Claim("Measured Claim", ID("measuredClaim"), undefined, undefined, undefined, true);
    const childClaim1 = new Claim("Child Claim 1", ID("childClaim1"));
    await calcInitator.notify([
        new Change(measuredClaim),
        new Change(childClaim1),
        new Change(new ClaimEdge(measuredClaim.id, childClaim1.id, Affects.Confidence, false)),
    ]);
    expect((await getScore(repo,measuredClaim.id)).confidence).toBe(-1);
});

test('Weird test case', async () => {
    const repo = new Repository();
    const messenger = new Messenger();
    const calcInitator = new CalculationInitator(repo, messenger.notify);
    const topClaim = new Claim("Fiction City should convert Elm Street to only pedestrian traffic?", ID("1"));
    const increaseBusiness = new Claim("The planning commission estimates this will increase foot traffic to local shops by 12% during peak hours.", ID("2"));
    const increaseTraffic = new Claim("This will result in traffic being diverted down residential streets.", ID("Traffic"));
    const childSafety = new Claim("Children safety is more important than profit for local shops.");
    const newStreet = new Claim("A set of railroad tracks are no longer in use and the City can convert that to a new street.");
    const costs = new Claim("The conversion will cost 2 Million dollars.");
    const payoff = new Claim("The increase in revenue is expected to pay off the expense in under 2 years meeting the cities investment requirements.");

    const testEdgeId = ID("TestEdge")

    await calcInitator.notify([
        new Change(topClaim),
        new Change(increaseBusiness),
        new Change(new ClaimEdge(topClaim.id, increaseBusiness.id, Affects.Confidence, true)),
        new Change(increaseTraffic),
        new Change(new ClaimEdge(topClaim.id, increaseTraffic.id, Affects.Confidence, false, testEdgeId)),
        new Change(childSafety),
        new Change(new ClaimEdge(increaseTraffic.id, childSafety.id, Affects.Relevance, true)),
        new Change(newStreet),
        new Change(new ClaimEdge(increaseTraffic.id, newStreet.id, Affects.Confidence, false)),
        new Change(costs),
        new Change(new ClaimEdge(topClaim.id, costs.id, Affects.Confidence, false)),
        new Change(payoff),
        new Change(new ClaimEdge(increaseBusiness.id, payoff.id, Affects.Relevance, true)),
    ]);
    expect((await getScore(repo,topClaim.id)).confidence).toBe(0.3333333333333333);

    await calcInitator.notify([
        new Change(increaseTraffic),// Sending in a claim resets it's score to 1 incorrectly
        new Change(new ClaimEdge(topClaim.id, increaseTraffic.id, Affects.Confidence, true, testEdgeId)),
    ]);
    expect((await getScore(repo,topClaim.id)).confidence).toBe(0.3333333333333333);

    await calcInitator.notify([
        new Change(new ClaimEdge(topClaim.id, increaseTraffic.id, Affects.Confidence, false, testEdgeId)),
    ]);
    expect((await getScore(repo,topClaim.id)).confidence).toBe(0.3333333333333333);

});