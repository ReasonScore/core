import { iAction } from "../../dataModels/Action";
import { iRsData, IndexArray } from "../../dataModels/RsData";
export declare function claimEdges(state: iRsData, action: iAction, reverse?: boolean): iRsData;
export declare function IndexDelete(state: any, index: IndexArray, keyId: string, id: string): iRsData;
