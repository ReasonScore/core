import { RsData } from "../dataModels/RsData";
import { Score } from "../dataModels/Score";

export function selectNode(selectedId: string, rsData: RsData) {
    const result: selectedStatus[] = []
    result.push({ itemId: selectedId, status: "selected" })

    // Walk up the tree and get ancestors
    let lastScoreId
    let parentScoreId = (rsData.items[selectedId] as Score)?.parentScoreId
    while (parentScoreId != undefined) {
        result.push({ itemId: parentScoreId, status: "ancestor" })
        parentScoreId = (rsData.items[parentScoreId] as Score).parentScoreId
    }

    //get the children
    const children = rsData.childIdsByScoreId[selectedId];
    if (children) {
        for (const childId of rsData.childIdsByScoreId[selectedId]) {
            result.push({ itemId: childId, status: "child" })
        }
    }

    return result;
}

export type selectedStatus = {
    itemId: string,
    status: selectedStatuses
}

export type selectedStatuses =
    "selected" |
    "ancestor" |
    "child" |
    "main"