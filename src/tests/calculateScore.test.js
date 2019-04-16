//const calculateScore = require('../calculateScore');
import { calculateScore } from "../calculateScore";
import { Score } from "../Score"
import { Edge, Affects } from "../Edge"


test('claim without any edges should have score of 1', () => {
    expect(calculateScore("1").score).toBe(1);
});

test('claim with one pro should have score of 1', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1")],
        [new Score("1.1")]
    ).score).toBe(1);
});

test('claim with one (non-reversable) con should have score of 0', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1", Affects.Confidence, false, false)],
        [new Score("1.1")]
    ).score).toBe(-1);
});

test('claim with one reversable con should have score of -1', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1", Affects.Confidence, false, true)],
        [new Score("1.1")]
    ).score).toBe(-1);
});

test('claim with one pro and one (non-reversable) con should have score of 0', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1"), new Edge("1", "1.2", Affects.Confidence, false, false)],
        [new Score("1.1"), new Score("1.2")]
    ).score).toBe(0);
});

test('claim with one pro and one reversable con should have score of 0', () => {
    expect(calculateScore(
        "1",
        [new Edge("1", "1.1"), new Edge("1", "1.2", Affects.Confidence, false, true)],
        [new Score("1.1"), new Score("1.2")]
    ).score).toBe(0);
});