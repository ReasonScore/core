import { Action } from "./dataModels/Action";
export declare class Messenger {
    readonly subscribers: {
        (changes: Action[]): void;
    }[];
    readonly actionsLog: Action[][];
    subscribe(callback: (actions: Action[]) => void): void;
    unsubscribe(callback: (actions: Action[]) => void): void;
    /** this function can be called by outside code to notfy this repository of changes */
    notify: (actions: Action[]) => void;
}
