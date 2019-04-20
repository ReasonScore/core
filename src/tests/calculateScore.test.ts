import { calculateScore } from "../calculateScore";
import { Score } from "../Score"
import each from 'jest-each';



test('claim without any edges should have score of 1', () => {
    expect(calculateScore().confidence).toBe(1);
});

each`
    id       | expScore  | expRel   | polarity | reversable | affects1        | confidence1 | relevance1
    ${'__1'} | ${+1.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'confidence'} | ${+1.00}    | ${+1.00}
    ${'__2'} | ${+1.00}  | ${+2.00} | ${'pro'} | ${false}   | ${'relevance'}  | ${+1.00}    | ${+1.00}
    ${'__3'} | ${+0.50}  | ${+1.00} | ${'pro'} | ${false}   | ${'confidence'} | ${+0.50}    | ${+1.00}
    ${'__4'} | ${+0.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'confidence'} | ${+0.00}    | ${+1.00}
    ${'__4'} | ${+0.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'confidence'} | ${-1.00}    | ${+1.00}
    ${'__6'} | ${-1.00}  | ${+1.00} | ${'pro'} | ${true}    | ${'confidence'} | ${-1.00}    | ${+1.00}
    ${'__7'} | ${-1.00}  | ${+1.00} | ${'con'} | ${false}   | ${'confidence'} | ${+1.00}    | ${+1.00}
    ${'__8'} | ${-0.50}  | ${+1.00} | ${'con'} | ${false}   | ${'confidence'} | ${+0.50}    | ${+1.00}
    ${'__9'} | ${+0.00}  | ${+1.00} | ${'con'} | ${false}   | ${'confidence'} | ${+0.00}    | ${+1.00}
    ${'_10'} | ${+0.00}  | ${+1.00} | ${'con'} | ${false}   | ${'confidence'} | ${-1.00}    | ${+1.00}
    ${'_11'} | ${+1.00}  | ${+1.00} | ${'con'} | ${true}    | ${'confidence'} | ${-1.00}    | ${+1.00}
`.describe('', ({ id, expScore, expRel, polarity, reversable, affects1, confidence1, relevance1 }) => {
    const result = calculateScore(
        [new Score(confidence1, relevance1, id, affects1, false)],
        polarity === "pro" ? true : false,
        undefined,
        reversable,
    )
    test(`${id} ${polarity} ${(confidence1 < 0 ? "" : "+") + confidence1.toFixed(1)} ${(relevance1 < 0 ? "" : " ") + relevance1.toFixed(1)} ${affects1 ? "true " : "false"} ${affects1.padEnd(10)},     score = ${(expScore < 0 ? "" : " ") + expScore.toFixed(1)}`, () => {
        expect(result.confidence).toBe(expScore);
    });
    test(`${id} ${polarity} ${(confidence1 < 0 ? "" : "+") + confidence1.toFixed(1)} ${(relevance1 < 0 ? "" : " ") + relevance1.toFixed(1)} ${affects1 ? "true " : "false"} ${affects1.padEnd(10)}, relevance = ${(expRel < 0 ? "" : " ") + expRel.toFixed(1)}`, () => {
        expect(result.relevance).toBe(expRel);
    });
});
