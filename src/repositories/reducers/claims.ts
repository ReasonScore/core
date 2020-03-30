import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"

export function claims(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_claim":
            {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: action.newData
                    }
                } as iRsData
            }
        case "modify_claim":
            {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: {
                            ...state.items[action.dataId],
                            ...action.newData,
                        }
                    }
                } as iRsData
            }

        // TODO: Handle reverse (Or save state somewhere, would that be too large?)

        default:
            return state
    }
}