import { Change } from "./dataModels/Change";
export declare class Messenger {
    readonly subscribers: {
        (changes: Change[]): void;
    }[];
    readonly log: Change[][];
    subscribe(callback: (changes: Change[]) => void): void;
    unsubscribe(callback: (changes: Change[]) => void): void;
    /** this function can be called by outside code to notfy this repository of changes */
    notify: (changes: Change[]) => void;
}
