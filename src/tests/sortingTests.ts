import { Score } from "../dataModels/Score";

// This code is currently used in Reason Score\editor\src\ScoreElement.tsx but is tested here just because the test  framework is set up
const ScoreSorter = (a: Score, b: Score) => {
    // if ((a.priority === undefined || a.priority === "")) return 1;
    // if ((b.priority === undefined || b.priority === ""))  return -1;
    if (a.priority > b.priority) return 1;
    if (a.priority < b.priority) return -1;
    if (a.descendantCount > b.descendantCount) return 1;
    if (b.descendantCount > a.descendantCount) return -1;
    if (a.confidence > b.confidence) return 1;
    if (b.confidence > a.confidence) return -1;
    return 0;
}

export function sortingTests() {
    test('Priorities: "":""', async () => {
        expect(ScoreSorter(
            { priority: "" } as Score,
            { priority: "" } as Score
        )).toEqual(0)
    });

    test('Priorities: a:""', async () => {
        expect(ScoreSorter(
            { priority: "a" } as Score,
            { priority: "" } as Score
        )).toEqual(1)
    });

    test('Priorities: "":a', async () => {
        expect(ScoreSorter(
            { priority: "" } as Score,
            { priority: "a" } as Score
        )).toEqual(-1)
    });

    // test('Count: 0:1', async () => {
    //     expect(ScoreSorter(
    //         { priority: "", descendantCount:0 } as Score,
    //         { priority: "", descendantCount:1 } as Score
    //     )).toEqual(1)
    // });
}


