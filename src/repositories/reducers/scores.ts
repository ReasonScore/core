import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"
import { Score } from "../../dataModels/Score"
import { IndexReducer } from "./IndexReducer";

export function scores(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_score":
        case "modify_score":
        case "sync_score":
            {
                // Since the score data might just be some of the data we need to get the current score and combine them
                const originalScore = state.items[action.dataId];
                let score = action.newData as Score
                if (originalScore) {
                    score = { ...originalScore, ...score }
                }

                state = {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: score,
                    }
                }

                //TODO: Do I need to stop recreating the state so many times in this reducer?
                state = IndexReducer(state, "childIdsByScoreId", score.parentScoreId, action.dataId);
                state = IndexReducer(state, "scoreIdsBySourceId", score.sourceClaimId, action.dataId);
                state = IndexReducer(state, "scoreIdsBySourceId", score.sourceEdgeId, action.dataId);
                return state as iRsData
            }
        default:
            return state
    }
}


