import { RepositoryLocalPure } from "../repositories/RepositoryLocalPure";
import { calculateScoreActions } from "../calculateScoreActions";
import { Action } from "../dataModels/Action";
import { Claim } from "../dataModels/Claim";
import { ScoreTree } from "../dataModels/ScoreTree";
import { ClaimEdge } from "../dataModels/ClaimEdge";
import { iRepository } from "../dataModels/iRepository";

export function scoreTests() {

    const u = undefined, pro = true, con = false

    const actionsBase: Action[] = [
        new Action(new Claim('mainClaim', 'mainClaim'), u, 'add_claim'), new Action(new ScoreTree('mainClaim', 'mainClaim-score', u, 'ScoreTree'), u, 'add_scoreTree'),
        new Action(new Claim('01', '01'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '01', u, con, '01-edge'), u, 'add_claimEdge'),
        new Action(new Claim('02', '02'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '02', u, pro, '02-edge'), u, 'add_claimEdge'),
        new Action(new Claim('02-1', '02-1'), u, 'add_claim'), new Action(new ClaimEdge('02', '02-1', u, pro, '02-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('02-2', '02-2'), u, 'add_claim'), new Action(new ClaimEdge('02', '02-2', u, con, '02-2-edge'), u, 'add_claimEdge'),
        new Action(new Claim('03', '03'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '03', u, pro, '03-edge'), u, 'add_claimEdge'),
        new Action(new Claim('03-1', '03-1'), u, 'add_claim'), new Action(new ClaimEdge('03', '03-1', u, con, '03-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('03-2', '03-2'), u, 'add_claim'), new Action(new ClaimEdge('03', '03-2', u, pro, '03-2-edge'), u, 'add_claimEdge'),
        new Action(new Claim('03-3', '03-3'), u, 'add_claim'), new Action(new ClaimEdge('03', '03-3', u, pro, '03-3-edge'), u, 'add_claimEdge'),
        new Action(new Claim('04', '04'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '04', u, pro, '04-edge'), u, 'add_claimEdge'),
        new Action(new Claim('04-1', '04-1'), u, 'add_claim'), new Action(new ClaimEdge('04', '04-1', 'relevance', pro, '04-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('05', '05'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '05', u, pro, '05-edge'), u, 'add_claimEdge'),
        new Action(new Claim('05-1', '05-1'), u, 'add_claim'), new Action(new ClaimEdge('05', '05-1', u, con, '05-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('06', '06'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '06', u, con, '06-edge'), u, 'add_claimEdge'),
        new Action(new Claim('06-1', '06-1'), u, 'add_claim'), new Action(new ClaimEdge('06', '06-1', u, con, '06-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('07', '07'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '07', u, pro, '07-edge'), u, 'add_claimEdge'),
        new Action(new Claim('07-1', '07-1'), u, 'add_claim'), new Action(new ClaimEdge('07', '07-1', u, con, '07-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('08', '08'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '08', u, con, '08-edge'), u, 'add_claimEdge'),
        new Action(new Claim('08-1', '08-1'), u, 'add_claim'), new Action(new ClaimEdge('08', '08-1', u, con, '08-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('09', '09'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '09', u, pro, '09-edge'), u, 'add_claimEdge'),
        new Action(new Claim('09-1', '09-1'), u, 'add_claim'), new Action(new ClaimEdge('09', '09-1', u, pro, '09-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('09-1-2', '09-1-2'), u, 'add_claim'), new Action(new ClaimEdge('09-1', '09-1-2', u, con, '09-1-2-edge'), u, 'add_claimEdge'),
        new Action(new Claim('10', '10'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '10', u, con, '10-edge'), u, 'add_claimEdge'),
        new Action(new Claim('10-1', '10-1'), u, 'add_claim'), new Action(new ClaimEdge('10', '10-1', u, pro, '10-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('10-1-1', '10-1-1'), u, 'add_claim'), new Action(new ClaimEdge('10-1', '10-1-1', u, con, '10-1-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('11', '11'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '11', u, con, '11-edge'), u, 'add_claimEdge'),
        new Action(new Claim('11-1', '11-1'), u, 'add_claim'), new Action(new ClaimEdge('11', '11-1', u, con, '11-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('11-2', '11-2'), u, 'add_claim'), new Action(new ClaimEdge('11-1', '11-2', u, con, '11-2-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12', '12'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '12', u, pro, '12-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12-1', '12-1'), u, 'add_claim'), new Action(new ClaimEdge('12', '12-1', u, pro, '12-1-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12-2', '12-2'), u, 'add_claim'), new Action(new ClaimEdge('12-1', '12-2', u, pro, '12-2-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12-3', '12-3'), u, 'add_claim'), new Action(new ClaimEdge('12-2', '12-3', u, pro, '12-3-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12-4', '12-4'), u, 'add_claim'), new Action(new ClaimEdge('12-3', '12-4', u, pro, '12-4-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12-5', '12-5'), u, 'add_claim'), new Action(new ClaimEdge('12-4', '12-5', u, pro, '12-5-edge'), u, 'add_claimEdge'),
        new Action(new Claim('12-6', '12-6'), u, 'add_claim'), new Action(new ClaimEdge('12-5', '12-6', u, pro, '12-6-edge'), u, 'add_claimEdge'),
    ]

    async function buildResults(expectations: (string | any)[][], repository: iRepository) {
        const results = []
        for (const expectation of expectations) {
            const pathItems = expectation[0].split(".");
            let result: any;
            if (pathItems[0] === "getScoresBySourceId") {
                result = ((await repository.getScoresBySourceId(pathItems[1]))[0] as any)[pathItems[2]];
            }

            results.push([
                expectation[0],
                result
            ])
        }
        return results;
    }

    test('Original Scores', async () => {
        const repository = new RepositoryLocalPure();
        await calculateScoreActions({
            actions: actionsBase,
            repository: repository
        })
        const expectations = [
            ['getScoresBySourceId.mainClaim.confidence', 0.48717948717948717],
            ['getScoresBySourceId.01.confidence', 1],
            ['getScoresBySourceId.02.confidence', 0],
            ['getScoresBySourceId.02-1.confidence', 1],
            ['getScoresBySourceId.02-2.confidence', 1],
            ['getScoresBySourceId.03.confidence', 0.3333333333333333],
            ['getScoresBySourceId.03-1.confidence', 1],
            ['getScoresBySourceId.03-2.confidence', 1],
            ['getScoresBySourceId.03-3.confidence', 1],
            ['getScoresBySourceId.04.confidence', 1],
            ['getScoresBySourceId.04-1.confidence', 1],
            ['getScoresBySourceId.05.confidence', -1],
            ['getScoresBySourceId.05-1.confidence', 1],
            ['getScoresBySourceId.06.confidence', -1],
            ['getScoresBySourceId.06-1.confidence', 1],
            ['getScoresBySourceId.07.confidence', -1],
            ['getScoresBySourceId.07-1.confidence', 1],
            ['getScoresBySourceId.08.confidence', -1],
            ['getScoresBySourceId.08-1.confidence', 1],
            ['getScoresBySourceId.09.confidence', 0],
            ['getScoresBySourceId.09-1.confidence', -1],
            ['getScoresBySourceId.09-1-2.confidence', 1],
            ['getScoresBySourceId.10.confidence', 0],
            ['getScoresBySourceId.10-1.confidence', -1],
            ['getScoresBySourceId.10-1-1.confidence', 1],
            ['getScoresBySourceId.11.confidence', 0],
            ['getScoresBySourceId.11-1.confidence', -1],
            ['getScoresBySourceId.11-2.confidence', 1],
            ['getScoresBySourceId.12.confidence', 1],
            ['getScoresBySourceId.12-1.confidence', 1],
            ['getScoresBySourceId.12-2.confidence', 1],
            ['getScoresBySourceId.12-3.confidence', 1],
            ['getScoresBySourceId.12-4.confidence', 1],
            ['getScoresBySourceId.12-5.confidence', 1],
            ['getScoresBySourceId.12-6.confidence', 1],
        ]
        const results = await buildResults(expectations, repository)
        expect(results).toMatchObject(expectations);
    });

    test('Fractions', async () => {
        const repository = new RepositoryLocalPure();
        await calculateScoreActions({
            actions: actionsBase,
            repository: repository
        })
        const expectations = [
            ['getScoresBySourceId.mainClaim.fraction', 1],
            ['getScoresBySourceId.01.fraction', 0.23076923076923078],
            ['getScoresBySourceId.03.fraction', 0.07692307692307693],
            ['getScoresBySourceId.03-1.fraction', 0.02564102564102564],
            ['getScoresBySourceId.03-2.fraction', 0.02564102564102564],
            ['getScoresBySourceId.03-3.fraction', 0.02564102564102564],
            ['getScoresBySourceId.04.fraction', 0.46153846153846156],
            ['getScoresBySourceId.04-1.fraction', 0.46153846153846156],
            ['getScoresBySourceId.05.fraction', 0],
            ['getScoresBySourceId.05-1.fraction', 0],
            ['getScoresBySourceId.12.fraction', 0.23076923076923078],
            ['getScoresBySourceId.12-1.fraction', 0.23076923076923078],
            ['getScoresBySourceId.12-2.fraction', 0.23076923076923078],
            ['getScoresBySourceId.12-3.fraction', 0.23076923076923078],
            ['getScoresBySourceId.12-4.fraction', 0.23076923076923078],
            ['getScoresBySourceId.12-5.fraction', 0.23076923076923078],
            ['getScoresBySourceId.12-6.fraction', 0.23076923076923078],
        ]
        const results = await buildResults(expectations, repository)
        expect(results).toMatchObject(expectations);
    });

    test('Deep fraction', async () => {
        const repository = new RepositoryLocalPure();
        const actionsDeepScores: Action[] = [
            new Action(new Claim('mainClaim', 'mainClaim'), u, 'add_claim'), new Action(new ScoreTree('mainClaim', 'mainClaim-score', u, 'ScoreTree'), u, 'add_scoreTree'),
            new Action(new Claim('01', '01'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '01', u, con, '01-edge'), u, 'add_claimEdge'),
            new Action(new Claim('01-1', '01-1'), u, 'add_claim'), new Action(new ClaimEdge('01', '01-1', u, pro, '01-1-edge'), u, 'add_claimEdge'),
            new Action(new Claim('01-2', '01-2'), u, 'add_claim'), new Action(new ClaimEdge('01', '01-2', u, con, '01-2-edge'), u, 'add_claimEdge'),
            new Action(new Claim('02', '02'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '02', u, pro, '02-edge'), u, 'add_claimEdge'),
            new Action(new Claim('02-1', '02-1'), u, 'add_claim'), new Action(new ClaimEdge('02', '02-1', u, con, '02-1-edge'), u, 'add_claimEdge'),
            new Action(new Claim('02-2', '02-2'), u, 'add_claim'), new Action(new ClaimEdge('02', '02-2', u, pro, '02-2-edge'), u, 'add_claimEdge'),
            new Action(new Claim('02-3', '02-3'), u, 'add_claim'), new Action(new ClaimEdge('02', '02-3', u, pro, '02-3-edge'), u, 'add_claimEdge'),
            new Action(new Claim('02-4', '02-4'), u, 'add_claim'), new Action(new ClaimEdge('02', '02-4', u, pro, '02-4-edge'), u, 'add_claimEdge'),
            new Action(new Claim('02-4-1', '02-4-1'), u, 'add_claim'), new Action(new ClaimEdge('02-4', '02-4-1', 'relevance', pro, '02-4-1-edge'), u, 'add_claimEdge'),
            new Action(new Claim('03', '03'), u, 'add_claim'), new Action(new ClaimEdge('mainClaim', '03', u, pro, '03-edge'), u, 'add_claimEdge'),]
        await calculateScoreActions({
            actions: actionsDeepScores,
            repository: repository
        })
        const expectations = [
            ['getScoresBySourceId.mainClaim.confidence', 0.8500000000000001], ['getScoresBySourceId.mainClaim.fraction', 1],
            ['getScoresBySourceId.01.confidence', 0], ['getScoresBySourceId.01.fraction', 0],
            ['getScoresBySourceId.01-1.confidence', 1], ['getScoresBySourceId.01-1.fraction', 0],
            ['getScoresBySourceId.01-2.confidence', 1], ['getScoresBySourceId.01-2.fraction', 0],
            ['getScoresBySourceId.02.confidence', 0.6000000000000001], ['getScoresBySourceId.02.fraction', 0.37500000000000006],
            ['getScoresBySourceId.02-1.confidence', 1], ['getScoresBySourceId.02-1.fraction', 0.07500000000000001],
            ['getScoresBySourceId.02-2.confidence', 1], ['getScoresBySourceId.02-2.fraction', 0.07500000000000001],
            ['getScoresBySourceId.02-3.confidence', 1], ['getScoresBySourceId.02-3.fraction', 0.07500000000000001],
            ['getScoresBySourceId.02-4.confidence', 1], ['getScoresBySourceId.02-4.fraction', 0.15000000000000002],
            ['getScoresBySourceId.02-4-1.confidence', 1], ['getScoresBySourceId.02-4-1.fraction', 0.15000000000000002],
            ['getScoresBySourceId.03.confidence', 1], ['getScoresBySourceId.03.fraction', 0.625],
            ['getScoresBySourceId.mainClaim.fractionSimple', 1],
            ['getScoresBySourceId.01.fractionSimple', 0.3333333333333333],
            ['getScoresBySourceId.01-1.fractionSimple', 0.16666666666666666],
            ['getScoresBySourceId.01-2.fractionSimple', 0.16666666666666666],
            ['getScoresBySourceId.02.fractionSimple', 0.3333333333333333],
            ['getScoresBySourceId.02-1.fractionSimple', 0.06666666666666667],
            ['getScoresBySourceId.02-2.fractionSimple', 0.06666666666666667],
            ['getScoresBySourceId.02-3.fractionSimple', 0.06666666666666667],
            ['getScoresBySourceId.02-4.fractionSimple', 0.13333333333333333],
            ['getScoresBySourceId.02-4-1.fractionSimple', 0.13333333333333333],
            ['getScoresBySourceId.03.fractionSimple', 0.3333333333333333],
        ]
        const results = await buildResults(expectations, repository)
        expect(results).toMatchObject(expectations);
    });
}