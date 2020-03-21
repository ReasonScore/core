import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"
import { iScore } from "../../dataModels/Score"

export function scores(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_score" || "modify_score":
            {
                const score = action.newData as iScore
debugger
                //Add any missing arrays
                if (score.parentScoreId && !state.childIdsByScoreId[score.parentScoreId]) {
                    state.childIdsByScoreId[score.parentScoreId] = []
                }
                if (!state.scoreIdsByClaimId[score.sourceClaimId]) {
                    state.scoreIdsByClaimId[score.sourceClaimId] = []
                }

                //If there is a parent then index the child
                if (score.parentScoreId) {
                    state = { //TODO: is it bad form to reassign a param?
                        ...state,
                        childIdsByScoreId: {
                            ...state.childIdsByScoreId,
                            [score.parentScoreId]: [
                                ...state.childIdsByScoreId[score.parentScoreId],
                                action.dataId
                            ]
                        }
                    }
                }

                return {
                    ...state,
                    scores: {
                        ...state.scores,
                        [action.dataId]: action.newData,
                    },
                    scoreIdsByClaimId: {
                        ...state.scoreIdsByClaimId,
                        [score.sourceClaimId]: [
                            ...state.scoreIdsByClaimId[score.sourceClaimId],
                            action.dataId
                        ]
                    }
                } as iRsData
            }
        default:
            return state
    }
}