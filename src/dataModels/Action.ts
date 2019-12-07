import { Id } from "./Id";
import { ActionTypes } from "./ActionTypes";

export class Action {
    constructor(
        public newData: any,
        public oldData: any,
        public when: string,
        public type: ActionTypes,
        public id: Id,
    ) {
    }
}