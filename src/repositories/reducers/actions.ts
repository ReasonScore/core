import { Action } from "../../dataModels/Action"
import { RsData } from "../../dataModels/RsData"

export function actions(state: RsData, action: Action[]): RsData {
    return {
        ...state,
        actionsLog: [...action,
        ...state.actionsLog
        ]
    } as RsData
}