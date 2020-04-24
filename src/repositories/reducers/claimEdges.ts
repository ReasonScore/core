import { Action } from "../../dataModels/Action"
import { RsData, IndexArray } from "../../dataModels/RsData"
import { IndexReducer } from "./IndexReducer"
import { ClaimEdge } from "../../dataModels/ClaimEdge";
import { Score } from "../../dataModels/Score";

export function claimEdges(state: RsData, action: Action, reverse: boolean = false): RsData {
    switch (action.type) {
        case "add_claimEdge":
        case "modify_claimEdge":
        case "sync_claimEdge":
            {
                state = {
                    ...state,
                    items: {
                        ...state.items,
                        [action.dataId]: { ...state.items[action.dataId], ...action.newData },
                    }
                }

                state = IndexReducer(state, "claimEdgeIdsByChildId", action.newData.childId, action.dataId);
                state = IndexReducer(state, "claimEdgeIdsByParentId", action.newData.parentId, action.dataId);

                return state as RsData
            }
        case "delete_claimEdge":
            {
                const claimEdge = state.items[action.dataId] as ClaimEdge;
                //TODO: Check that I'm not deleting anythign I shouldn't or deleting something twice?
                //TODO: This leaves a lot of orphaned scores and claim and claimedges
                //TODO: Probably should comment what this is doing
                delete state.items[action.dataId];
                state = IndexDelete(state, state.claimEdgeIdsByChildId, claimEdge.childId, action.dataId);
                state = IndexDelete(state, state.claimEdgeIdsByParentId, claimEdge.parentId, action.dataId);

                const scoreIds = state.scoreIdsBySourceId[action.dataId]
                for (const scoreId of scoreIds) {
                    const score = state.items[scoreId] as Score;
                    delete state.items[scoreId];
                    delete state.scoreIdsBySourceId[action.dataId];
                    delete state.childIdsByScoreId[scoreId];
                    if (score.parentScoreId) {
                        state = IndexDelete(state, state.childIdsByScoreId, score.parentScoreId, scoreId);
                    }
                    state = IndexDelete(state, state.scoreIdsBySourceId, score.sourceClaimId, scoreId);
                }
                return state as RsData
            }
        default:
            return state
    }
}

export function IndexDelete(state: any, index: IndexArray, keyId: string, id: string): RsData {
    const internalIndex = index[keyId]
    const location = internalIndex.indexOf(id, 0);
    if (location > -1) {
        internalIndex.splice(location, 1);
    }

    return state;
}