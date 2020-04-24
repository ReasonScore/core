import { Action } from "../../dataModels/Action"
import { RsData } from "../../dataModels/RsData"

export function claims(state: RsData, action: Action, reverse: boolean = false): RsData {
    switch (action.type) {
        case "add_claim":
        case "sync_claim":
            {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: action.newData
                    }
                } as RsData
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
                } as RsData
            }

        // TODO: Handle reverse (Or save state somewhere, would that be too large?)

        default:
            return state
    }
}