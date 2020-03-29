import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"
import { IndexReducer } from "./IndexReducer"

export function claimEdges(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_claimEdge":
        case "modify_claimEdge":
            {
                state = {
                    ...state,
                    claimEdges: {
                        ...state.claimEdges,
                        [action.dataId]: {...state.claimEdges[action.dataId], ...action.newData},
                    }
                } 

                state = IndexReducer(state, "claimEdgeIdsByChildId", action.newData.childId, action.dataId);
                state = IndexReducer(state, "claimEdgeIdsByParentId", action.newData.parentId, action.dataId);
                
                return state as iRsData
            }
        default:
            return state
    }
}