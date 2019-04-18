import { calculateScore } from "../calculateScore";
import { Score } from "../Score"
import { Affects } from "../Affects"
import each from 'jest-each';


test('claim without any edges should have score of 1', () => {
    expect(calculateScore().score).toBe(1);
});


each`
       pro   | score   | relevance | reversable | affects         | expScore | expRel
    ${'pro'} | ${1.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${1.0}   | ${1.0}
    ${"pro"} | ${1.0}  | ${1.0}    | ${false}   | ${"Relevance"}  | ${1.0}   | ${2.0}
    ${"pro"} | ${0.5}  | ${1.0}    | ${false}   | ${"Confidence"} | ${0.5}   | ${1.0}
    ${"pro"} | ${0.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
    ${"pro"} | ${-1.0} | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
    ${"pro"} | ${-1.0} | ${1.0}    | ${true}    | ${"Confidence"} | ${-1.0}  | ${1.0}
    ${"con"} | ${1.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${-1.0}  | ${1.0}
    ${"con"} | ${0.5}  | ${1.0}    | ${false}   | ${"Confidence"} | ${-0.5}  | ${1.0}
    ${"con"} | ${0.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
    ${"con"} | ${-1.0} | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
    ${"con"} | ${-1.0} | ${1.0}    | ${true}    | ${"Confidence"} | ${1.0}   | ${1.0}
      `.describe('', ({ pro, score, relevance, reversable, affects, expScore, expRel }) => {
    const result = calculateScore(
        [new Score(Affects[affects], false, score, relevance)],
        pro === "pro" ? true : false,
        undefined,
        reversable,
    )
    test(`${pro} ${(score < 0 ? "" : " ") + score.toFixed(1)} ${(relevance < 0 ? "" : " ") + relevance.toFixed(1)} ${reversable ? "true " : "false"} ${affects.padEnd(10)},     score = ${(expScore < 0 ? "" : " ") + expScore.toFixed(1)}`, () => {
        expect(result.score).toBe(expScore);
    });
    test(`${pro} ${(score < 0 ? "" : " ") + score.toFixed(1)} ${(relevance < 0 ? "" : " ") + relevance.toFixed(1)} ${reversable ? "true " : "false"} ${affects.padEnd(10)}, relevance = ${(expRel < 0 ? "" : " ") + expRel.toFixed(1)}`, () => {
        expect(result.relevance).toBe(expRel);
    });
});

// test('claim with one pro and one (non-reversable) con should have score of 0', () => {
//     expect(calculateScore(
//         "1",
//         [new Edge("1", "1.1"),
//         new Edge("1", "1.2", Affects.Confidence, false, false)],
//         [new Score("1.1"), new Score("1.2")]
//     ).score).toBe(0);
// });

// test('claim with one pro and one reversable con should have score of 0', () => {
//     expect(calculateScore(
//         "1",
//         [new Edge("1", "1.1"),
//         new Edge("1", "1.2", Affects.Confidence, false, true)],
//         [new Score("1.1"), new Score("1.2")]
//     ).score).toBe(0);
// });