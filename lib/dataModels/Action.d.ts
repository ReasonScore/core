import { ActionTypes } from "./ActionTypes";
export declare class Action {
    newData: any;
    oldData: any;
    type: ActionTypes;
    dataId: string;
    constructor(newData: any, oldData: any, type: ActionTypes, dataId?: string);
}
