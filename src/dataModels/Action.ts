import { ActionTypes } from "./ActionTypes";

export interface iAction {
        newData: any,
        oldData: any,
        type: ActionTypes,
        dataId: string,
}

export class Action implements iAction {
    constructor(
        public newData: any,
        public oldData: any,
        public type: ActionTypes,
        public dataId: string,
    ) {
    }
}