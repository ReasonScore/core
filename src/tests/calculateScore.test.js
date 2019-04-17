import { calculateScore } from "../calculateScore";
import { Score } from "../Score"
import { Edge, Affects } from "../Edge"
import each from 'jest-each';


test('claim without any edges should have score of 1', () => {
    expect(calculateScore("1").score).toBe(1);
});

each`
     pro   | score   | reversable | affects         | expScore | expRel
  ${"pro"} | ${1.0}  | ${false}   | ${"Confidence"} | ${1.0}   | ${1.0}
  ${"pro"} | ${1.0}  | ${false}   | ${"Relevance"}  | ${1.0}   | ${2.0}
  ${"pro"} | ${0.5}  | ${false}   | ${"Confidence"} | ${0.5}   | ${1.0}
  ${"pro"} | ${0.0}  | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
  ${"pro"} | ${-1.0} | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
  ${"pro"} | ${-1.0} | ${true}    | ${"Confidence"} | ${-1.0}  | ${1.0}
  ${"con"} | ${1.0}  | ${false}   | ${"Confidence"} | ${-1.0}  | ${1.0}
  ${"con"} | ${0.5}  | ${false}   | ${"Confidence"} | ${-0.5}  | ${1.0}
  ${"con"} | ${0.0}  | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
  ${"con"} | ${-1.0} | ${false}   | ${"Confidence"} | ${0.0}   | ${1.0}
  ${"con"} | ${-1.0} | ${true}    | ${"Confidence"} | ${1.0}   | ${1.0}
`.test('one $score $affects $pro reversable:$reversable = $expScore ', ({ pro, score, reversable, affects, expScore, expRel }) => {
    expect(calculateScore("1",
        [new Edge("1", "1.1", Affects[affects], pro === "pro" ? true : false, reversable)],
        [new Score("1.1", score)]
    ).score).toBe(expScore);
    expect(calculateScore("1",
        [new Edge("1", "1.1", Affects[affects], pro === "pro" ? true : false, reversable)],
        [new Score("1.1", score)]
    ).relevance).toBe(expRel);
});

test('claim with one pro and one (non-reversable) con should have score of 0', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1"),
        new Edge("1", "1.2", Affects.Confidence, false, false)],
        [new Score("1.1"), new Score("1.2")]
    ).score).toBe(0);
});

test('claim with one pro and one reversable con should have score of 0', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1"),
        new Edge("1", "1.2", Affects.Confidence, false, true)],
        [new Score("1.1"), new Score("1.2")]
    ).score).toBe(0);
});