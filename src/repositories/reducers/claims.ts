import { Action } from "../../dataModels/Action"
import { RsData } from "../../dataModels/RsData"
import { Claim } from "../../dataModels/Claim"

export function claims(state: RsData, action: Action, reverse: boolean = false): RsData {
    switch (action.type) {
        case "add_claim":
        case "sync_claim":
        case "modify_claim":
            {
                let newItem = state.items[action.dataId] as Claim
                if (!newItem){
                    newItem = new Claim("","")
                    newItem.id = action.dataId
                }
                newItem = {...newItem, ...action.newData}
                
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: newItem,
                    }
                } as RsData
            }

        default:
            return state
    }
}