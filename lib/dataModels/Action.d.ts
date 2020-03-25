import { ActionTypes } from "./ActionTypes";
export interface iAction {
    newData: any;
    oldData: any;
    type: ActionTypes;
    dataId: string;
}
export declare class Action implements iAction {
    newData: any;
    oldData: any;
    type: ActionTypes;
    dataId: string;
    constructor(newData: any, oldData: any, type: ActionTypes, dataId?: string);
}
