import { calculateScore } from "../calculateScore";
import { Score } from "../dataModels/Score";
import { Id, ID } from "../dataModels/Id";

test('claim without any edges should have score of 1', () => {
    expect(calculateScore().confidence).toBe(1);
});

describe.each`
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
`('', ({ id, expScore, expRel, polarity, reversable, affects1, confidence1, relevance1 }) => {
    const scores = [new Score(confidence1, relevance1, id, ID(""), undefined, affects1, false)];
    const result = calculateScore(
        scores,
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

describe.each`
    id       | expScore  | expRel   | polarity | reversable | affects1        | confidence1 | relevance1 | affects2        | confidence2 | relevance2
    ${'_12'} | ${+1.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'confidence'} | ${+1.00}    | ${+1.00}   | ${'confidence'} | ${+1.00}    | ${+1.00}
    ${'_13'} | ${+0.00}  | ${+1.00} | ${'pro'} | ${false}   | ${'confidence'} | ${+1.00}    | ${+1.00}   | ${'confidence'} | ${-1.00}    | ${+1.00}
`('', ({ id, expScore, expRel, polarity, reversable, affects1, confidence1, relevance1 , affects2, confidence2, relevance2}) => {
    const scores = [

        new Score(confidence1, relevance1, id, ID(""), undefined, affects1, false),
        new Score(confidence2, relevance2, ID(id+ "_2"), ID(""), undefined, affects2, false),           
    ];
    //debugger;
    const result = calculateScore(
        scores,
        polarity === "pro" ? true : false,
        undefined,
        reversable,
    )
    test(`${id}`, () => {
        expect(result.confidence).toBe(expScore);
    });
    test(`${id}`, () => {
        expect(result.relevance).toBe(expRel);
    });
});