import { calculateScore } from "../calculateScore";
import { Score } from "../dataModels/Score";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { ID } from "../dataModels/Id";
import { Affects } from "../dataModels/Affects";

class TestData {
    constructor(
        public testDescription: string = "Test",
        public expectedScore: Score,
        public scores: Score[] = [],
        public reversible: boolean = false,
    ) {
    }
}

function s(confidence: number = 1, relevance: number = 1, pro: boolean = true, affects: Affects = "confidence"): Score {
    return new Score(ID(""), undefined, undefined, pro, affects, confidence, relevance);
}

function t(testDescription: string, expectedScore: Score, scores: Score[], reversible: boolean = false) {
    return new TestData(testDescription, expectedScore, scores, reversible)
}

const pro = true;
const con = false;

const testData = [
    t("no scores = 1 ", s(1), []),
    t("1 and 1 = 1 ", s(1), [s(1), s(1)]),
    t(" 1 and -1 = 0", s(0), [s(1), s(-1)]),
    t("pro and con = 0", s(0), [s(1), s(1, 1, con)]),
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
            const result = calculateScore({ scores: t.scores, reversible: t.reversible });
            expect(result.confidence).toBe(t.expectedScore.confidence)
        });

    },
);

