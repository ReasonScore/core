import { ScoreAndClaimEdge } from "../dataModels/ScoreAndClaimEdge";
import { groupScoresByScopes, ScoresByScope } from "../groupScoresByScopes";
import { Score } from "../dataModels/Score";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { ID, Id } from "../dataModels/Id";

test('If the score scope equals the score ID and claimEdge Scope equals base then the Score should be put in the base scope ', () => {
    const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];
    const IdBase= ID("Base");
    const IdExpected = ID("Expected")
    const expectedScore = new Score(undefined,undefined,IdExpected,undefined,IdExpected);

    scoreAndClaimEdges.push(
        new ScoreAndClaimEdge (
            expectedScore,
            new ClaimEdge(IdBase,IdExpected,IdBase),
        )
    )

    const scoresByScope = groupScoresByScopes(scoreAndClaimEdges, IdBase);
    expect(scoresByScope[IdBase.toString()][0]).toEqual(expectedScore);
});

test('If the score scope equals the Base and claimEdge Scope equals base then the Score should be put in the base scope ', () => {
    const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];
    const IdBase= ID("Base");
    const IdExpected = ID("Expected")
    const expectedScore = new Score(undefined,undefined,IdExpected,undefined,IdBase);

    scoreAndClaimEdges.push(
        new ScoreAndClaimEdge (
            expectedScore,
            new ClaimEdge(IdBase,IdExpected,IdBase),
        )
    )

    const scoresByScope = groupScoresByScopes(scoreAndClaimEdges, IdBase);
    expect(scoresByScope[IdBase.toString()][0]).toEqual(expectedScore);
});

test('If the score scope equals the Score ID and claimEdge Scope is not equal to the base then the Score should be put in the claimEdge scope scope ', () => {
    const scoreAndClaimEdges: ScoreAndClaimEdge[] = [];
    const IdBase= ID("Base");
    const IdExpected = ID("Expected")
    const newScope = ID("New")
    const expectedScore = new Score(undefined,undefined,IdExpected,undefined,IdExpected);

    scoreAndClaimEdges.push(
        new ScoreAndClaimEdge (
            expectedScore,
            new ClaimEdge(IdBase,IdExpected,newScope),
        )
    )

    const scoresByScope = groupScoresByScopes(scoreAndClaimEdges, IdBase);
    expect(scoresByScope[newScope.toString()][0]).toEqual(expectedScore);
});
