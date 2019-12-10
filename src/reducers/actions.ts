import { iAction } from "../dataModels/Action"
import { iRsData } from "../dataModels/RsData"

export function actions(state: iRsData, action: iAction[]): iRsData {
    return {
        ...state,
        actionsLog: [...action,
        ...state.actionsLog
        ]
    } as iRsData
}