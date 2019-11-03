import { calculateScore } from "../calculateScore";
import { Score } from "../dataModels/Score";
import { ID } from "../dataModels/Id";
import { ScoreAndClaimEdge } from "../dataModels/ScoreAndClaimEdge";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Repository, Messenger, CalculationInitator, Claim, Change, Affects } from "..";

test('complicated test for debugging Messenger', () => {
    const repo = new Repository();
    const messenger = new Messenger();
    const calculationInitator = new CalculationInitator(repo, messenger.notify);
    const topClaim = new Claim("Fiction City should convert Elm Street to only pedestrian traffic?", ID("1"));

    calculationInitator.notify([
        new Change(topClaim),
    ]);

    expect(calculateScore().confidence).toBe(1);
});

