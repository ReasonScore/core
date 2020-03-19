import { Action } from "./dataModels/Action";
export declare class Messenger {
    readonly subscribers: {
        (changes: Action[]): void;
    }[];
    readonly log: Action[][];
    subscribe(callback: (changes: Action[]) => void): void;
    unsubscribe(callback: (changes: Action[]) => void): void;
    /** this function can be called by outside code to notfy this repository of changes */
    notify: (changes: Action[]) => void;
}
