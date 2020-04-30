import { iRepository } from "../dataModels/iRepository";
export async function buildTestResults(expectations: (string | any)[][], repository: iRepository) {
    const results = [];
    for (const expectation of expectations) {
        const pathItems = expectation[0].split(".");
        let result: any;
        if (pathItems[0] === "getScoresBySourceId") {
            result = ((await repository.getScoresBySourceId(pathItems[1]))[0] as any)[pathItems[2]];
        }
        results.push([
            expectation[0],
            result
        ]);
    }
    return results;
}
