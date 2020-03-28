import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"
import { iScore } from "../../dataModels/Score"

export function scores(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_score":
        case "modify_score":
            {
                // Since the score data might just be some of the data we need to get the current score and combine them
                const originalScore = state.scores[action.dataId];
                let score = action.newData as iScore
                if (originalScore) {
                    score = { ...originalScore, ...score }
                }

                //Add any missing empty index arrays
                if (score.parentScoreId && !state.childIdsByScoreId[score.parentScoreId]) {
                    state.childIdsByScoreId[score.parentScoreId] = []
                }
                if (!state.scoreIdsBySourceId[score.sourceClaimId]) {
                    state.scoreIdsBySourceId[score.sourceClaimId] = []
                }
                if (score.sourceEdgeId) {
                    if (!state.scoreIdsBySourceId[score.sourceEdgeId]) {
                        state.scoreIdsBySourceId[score.sourceEdgeId] = []
                    }
                }

                //If there is a parent then index the child
                if (score.parentScoreId && state.childIdsByScoreId[score.parentScoreId].indexOf(action.dataId) == -1) {
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

                //TODO: Do I need to stop recreating the state so many times in this reducer?
                state = {
                    ...state,
                    scores: {
                        ...state.scores,
                        [action.dataId]: score,
                    }
                }

                if (state.scoreIdsBySourceId[score.sourceClaimId].indexOf(action.dataId) == -1) {
                    state = {
                        ...state,
                        scores: {
                            ...state.scores,
                            [action.dataId]: score,
                        },
                        scoreIdsBySourceId: {
                            ...state.scoreIdsBySourceId,
                            [score.sourceClaimId]: [
                                ...state.scoreIdsBySourceId[score.sourceClaimId],
                                action.dataId
                            ]
                        }
                    }
                }

                //Exception for the the sourceEdgeId exists
                if (score.sourceEdgeId && 
                    state.scoreIdsBySourceId[score.sourceEdgeId].indexOf(action.dataId) == -1) {
                    if (!state.scoreIdsBySourceId[score.sourceEdgeId]) {
                        state.scoreIdsBySourceId[score.sourceEdgeId] = []
                    }

                    state = {
                        ...state,
                        scoreIdsBySourceId: {
                            ...state.scoreIdsBySourceId,
                            [score.sourceEdgeId]: [
                                ...state.scoreIdsBySourceId[score.sourceEdgeId],
                                action.dataId
                            ]
                        }
                    }
                }

                return state as iRsData
            }
        default:
            return state
    }
}