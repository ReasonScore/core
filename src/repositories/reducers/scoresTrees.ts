import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"
import { ScoreTree } from "../../dataModels/ScoreTree";

export function scoreTrees(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_scoreTree":
        case "modify_scoreTree":
            {
                // Since the score data might just be some of the data we need to get the current score and combine them
                const originalItem = state.items[action.dataId];
                let newItem = action.newData as ScoreTree
                if (originalItem) {
                    newItem = { ...originalItem, ...newItem }
                }

                state = {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: newItem,
                    }
                }

                if (state.ScoreTreeIds.indexOf(action.dataId) == -1) {
                    state = {
                        ...state,
                        ScoreTreeIds: [
                            ...state.ScoreTreeIds,
                            action.dataId
                        ]
                    };
                }
        
                return state as iRsData
            }
        default:
            return state
    }
}


