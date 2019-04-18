import { calculateScore } from "../calculateScore";
import { Score } from "../Score"
import { Affects } from "../Affects"
import each from 'jest-each';


test('claim without any edges should have score of 1', () => {
    expect(calculateScore().score).toBe(1);
});

//    pro   | score   | relevance | reversable | affects         | expScore | expRel
// ${'pro'} | ${1.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${1.0}   | ${1.0}
// ${"pro"} | ${1.0}  | ${1.0}    | ${false}   | ${"Relevance"}  | ${1.0}   | ${2.0}
// ${"pro"} | ${0.5}  | ${1.0}    | ${false}   | ${"Confidence"} | ${0.5}   | ${1.0}
// ${"pro"} | ${0.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
// ${"pro"} | ${-1.0} | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
// ${"pro"} | ${-1.0} | ${1.0}    | ${true}    | ${"Confidence"} | ${-1.0}  | ${1.0}
// ${"con"} | ${1.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${-1.0}  | ${1.0}
// ${"con"} | ${0.5}  | ${1.0}    | ${false}   | ${"Confidence"} | ${-0.5}  | ${1.0}
// ${"con"} | ${0.0}  | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
// ${"con"} | ${-1.0} | ${1.0}    | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
// ${"con"} | ${-1.0} | ${1.0}    | ${true}    | ${"Confidence"} | ${1.0}   | ${1.0}

each`
    id       | expScore  | expRel   | polarity | reversable | affects1        | score1    | relevance1
    ${'__1'} | ${+1.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'Confidence'} | ${+1.00}  | ${+1.00}
    ${'__2'} | ${+1.00}  | ${+2.00} | ${'pro'} | ${false}   | ${'Relevance'}  | ${+1.00}  | ${+1.00}
    ${'__3'} | ${+0.50}  | ${+1.00} | ${'pro'} | ${false}   | ${'Confidence'} | ${+0.50}  | ${+1.00}
    ${'__4'} | ${+0.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'Confidence'} | ${+0.00}  | ${+1.00}
    ${'__4'} | ${+0.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'Confidence'} | ${-1.00}  | ${+1.00}
    ${'__6'} | ${-1.00}  | ${+1.00} | ${'pro'} | ${true}    | ${'Confidence'} | ${-1.00}  | ${+1.00}
    ${'__7'} | ${-1.00}  | ${+1.00} | ${'con'} | ${false}   | ${'Confidence'} | ${+1.00}  | ${+1.00}
    ${'__8'} | ${-0.50}  | ${+1.00} | ${'con'} | ${false}   | ${'Confidence'} | ${+0.50}  | ${+1.00}
    ${'__9'} | ${+0.00}  | ${+1.00} | ${'con'} | ${false}   | ${'Confidence'} | ${+0.00}  | ${+1.00}
    ${'_10'} | ${+0.00}  | ${+1.00} | ${'con'} | ${false}   | ${'Confidence'} | ${-1.00}  | ${+1.00}
    ${'_11'} | ${+1.00}  | ${+1.00} | ${'con'} | ${true}    | ${'Confidence'} | ${-1.00}  | ${+1.00}
`.describe('', ({ id, expScore, expRel, polarity, reversable, affects1, score1, relevance1 }) => {
    const result = calculateScore(
        [new Score(Affects[affects1], false, score1, relevance1)],
        polarity === "pro" ? true : false,
        undefined,
        reversable,
    )
    test(`${id} ${polarity} ${(score1 < 0 ? "" : " ") + score1.toFixed(1)} ${(relevance1 < 0 ? "" : " ") + relevance1.toFixed(1)} ${affects1 ? "true " : "false"} ${affects1.padEnd(10)},     score = ${(expScore < 0 ? "" : " ") + expScore.toFixed(1)}`, () => {
        expect(result.score).toBe(expScore);
    });
    test(`${id} ${polarity} ${(score1 < 0 ? "" : " ") + score1.toFixed(1)} ${(relevance1 < 0 ? "" : " ") + relevance1.toFixed(1)} ${affects1 ? "true " : "false"} ${affects1.padEnd(10)}, relevance = ${(expRel < 0 ? "" : " ") + expRel.toFixed(1)}`, () => {
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