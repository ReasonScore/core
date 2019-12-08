import { Action } from "../dataModels/Action"
import { RsData } from "../dataModels/RsData"
import { Claim } from "../dataModels/Claim"

export function claims(state: RsData, action: Action) : RsData {
    switch (action.type) {
        case "add_claim":
            // TODO: Check if the claim exists and merge it with the previous version
            // TODO:  add to claim indexes
            const claim = action.newData as Claim;
            return {
                ...state,
                claims: {
                    ...state.claims,
                    [action.dataId]: action.newData
                }
            } as RsData

        default:
            return state
    }
}