import { calculateScore } from "../calculateScore";
import { Score } from "../dataModels/Score";
import { ID } from "../dataModels/Id";
import { ScoreAndClaimEdge } from "../dataModels/ScoreAndClaimEdge";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { Affects } from "..";

class TestData {
    constructor(
        public testDescription: string = "Test",
        public scoreAndClaimEdges: ScoreAndClaimEdge[] = [],
        public expectedScore: Score = new Score(),
        public reversible: boolean = false,
    ) {
    }
}

const testData = [
    new TestData("_12", [
        new ScoreAndClaimEdge(new Score(1, 1), new ClaimEdge(undefined, undefined, Affects.Confidence, true)),
        new ScoreAndClaimEdge(new Score(1, 1), new ClaimEdge(undefined, undefined, Affects.Confidence, true)),
    ], new Score(1)),
    new TestData("_13", [
        new ScoreAndClaimEdge(new Score(1, 1), new ClaimEdge(undefined, undefined, Affects.Confidence, true)),
        new ScoreAndClaimEdge(new Score(-1, 1), new ClaimEdge(undefined, undefined, Affects.Confidence, true)),
    ], new Score(0)),
    new TestData("_14", [
        new ScoreAndClaimEdge(new Score(1, 1), new ClaimEdge(undefined, undefined, Affects.Confidence, true)),
        new ScoreAndClaimEdge(new Score(0, 1), new ClaimEdge(undefined, undefined, Affects.Confidence, false)),
    ], new Score(1)),
]

const JsonTestData: string[] = [];

for (let data of testData) {
    JsonTestData.push(JSON.stringify(data))
}

describe.each(JsonTestData)(
    'Tests',
    (testJson) => {
        const t: TestData = JSON.parse(testJson);
        test(t.testDescription + ' Confidence', () => {
            const result = calculateScore({ scoreAndClaimEdges: t.scoreAndClaimEdges, reversible: t.reversible });
            expect(result.confidence).toBe(t.expectedScore.confidence)
        });

    },
);

