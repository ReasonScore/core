import { RepositoryLocalPure, Claim, Action, ClaimEdge, ScoreTree, calculateScoreActions } from "..";
import { selectNode, selectedStatus } from "../utils/selectNode";
import { Score } from "../dataModels/Score";

export function selectNodeTests() {
    const u = undefined, pro = true, con = false

    function s(id: string, parentId?: string) {
        return new Action(new Score('', '', parentId, '', u, u, u, u, u, id), u, 'add_score')
    }

    test('only Main', async () => {
        const repository = new RepositoryLocalPure();
        const actionsDeepScores: Action[] = [
            s('main', u),
        ]
        await calculateScoreActions({
            actions: actionsDeepScores,
            repository: repository
        })
        const expected: selectedStatus[] = [
            { itemId: 'main', status: 'selected' },
        ]
debugger

        const result = selectNode('main', repository.rsData)

        expect(result).toMatchObject(expected)
    });

    test('multiple selected tests', async () => {
        const repository = new RepositoryLocalPure();
        const actionsDeepScores: Action[] = [
            s('main', u),
            s('1', 'main'),
            s('2', 'main'),
            s('3', 'main'),
            s('2-1', '2'),
            s('2-1', '2'),
            s('2-1-1', '2-1'),
            s('2-1-2', '2-1'),
            s('2-1-1-1', '2-1-1'),
        ]
        await calculateScoreActions({
            actions: actionsDeepScores,
            repository: repository
        })

        let  expected: selectedStatus[] = [
            { itemId: '2-1', status: 'selected' },
            { itemId: '2', status: 'ancestor' },
            { itemId: 'main', status: 'ancestor' },
            { itemId: '2-1-1', status: 'child' },
            { itemId: '2-1-2', status: 'child' },
        ];
        let result = selectNode('2-1', repository.rsData);
debugger
        expect(result).toMatchObject(expected)
    });
}