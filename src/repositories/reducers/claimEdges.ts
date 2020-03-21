import { iAction } from "../../dataModels/Action"
import { iRsData } from "../../dataModels/RsData"

export function claimEdges(state: iRsData, action: iAction, reverse: boolean = false): iRsData {
    switch (action.type) {
        case "add_claimEdge":
            {
                //Add any missing arrays
                if (! state.claimEdgeIdsByParentId[action.newData.parentId]){
                    state.claimEdgeIdsByParentId[action.newData.parentId] = []
                }
                if (! state.claimEdgeIdsByChildId[action.newData.childId]){
                    state.claimEdgeIdsByChildId[action.newData.childId] = []
                }
                
                return {
                    ...state,
                    claimEdges: {
                        ...state.claimEdges,
                        [action.dataId]: action.newData,
                    },
                    claimEdgeIdsByParentId: {
                        ...state.claimEdgeIdsByParentId,
                        [action.newData.parentId]: [
                            ...state.claimEdgeIdsByParentId[action.newData.parentId],
                            action.dataId
                        ]
                    },
                    claimEdgeIdsByChildId: {
                        ...state.claimEdgeIdsByChildId,
                        [action.newData.childId]: [
                            ...state.claimEdgeIdsByChildId[action.newData.childId],
                            action.dataId
                        ]
                    }
                } as iRsData
            }
            // TODO: Handle modify_claimEdge
            // Check to see if the parent or child changes, If so, delete the reference and add the new one

            // TODO: Handle reverse (Or save state somewhere, would that be too large?)
        default:
            return state
    }
}