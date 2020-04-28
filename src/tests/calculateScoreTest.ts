import { calculateScore } from "../calculateScore";
import { Score } from "../dataModels/Score";
import { Affects } from "../dataModels/Affects";

export function calcullateScoreTests() {
    class TestData {
        constructor(
            public testDescription: string = "Test",
            public expectedScore: Score,
            public scores: Score[] = [],
            public reversible: boolean = false,
        ) {
        }
    }
    const u = undefined;
    function s(confidence: number = 1, relevance: number = 1,
        pro: boolean = true, affects: Affects = "confidence", reversible: boolean = false): Score {
        return new Score("", "", "", u, reversible, pro, affects, confidence, relevance);
    }

    function t(testDescription: string, expectedScore: Score, scores: Score[], reversible: boolean = false) {
        return new TestData(testDescription, expectedScore, scores, reversible)
    }

    const pro = true;
    const con = false;

    const testData = [
        t("no scores   =  1  ", s(1), []),
        t("1 and 1     =  1    ", s(1), [s(+1), s(+1)]),
        t(" 1 and -1   =  1 ", s(1), [s(+1), s(-1)]),
        t("-1          =  0 ", s(0), [s(-1)]),
        t(" 1 and -1r  =  0 ", s(0), [s(+1), s(-1, u, u, u, true)]),
        t("-1r         = -1 ", s(-1), [s(-1, u, u, u, true)]),
        t("pro and con =  0", s(0), [s(+1), s(+1, u, con)]),
        t("1 Relevance =  2", s(1, 2), [s(+1, 1, pro, "relevance")]),
        t("pro and con with relevance", s(0.3333333333333333), [s(+1, 2), s(+1, 1, con)]),
    ]

    const JsonTestData: string[] = [];

    for (let data of testData) {
        JsonTestData.push(JSON.stringify(data))
    }

    describe.each(JsonTestData)('',
        (testJson) => {
            const t: TestData = JSON.parse(testJson);
            test(t.testDescription + ' Confidence', () => {
                const result = calculateScore({ childScores: t.scores, reversible: t.reversible });
                expect(result.confidence).toBe(t.expectedScore.confidence)
                if (result.relevance != undefined) {
                    expect(result.relevance).toBe(t.expectedScore.relevance)
                }
            });

        },
    );
}
