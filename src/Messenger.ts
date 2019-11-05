import { Change } from "./dataModels/Change";

export class Messenger {
    public readonly subscribers: { (changes: Change[]): void; }[] = []
    public readonly log: Change[][] = [];

    subscribe(callback: (changes: Change[]) => void): void {
        this.subscribers.push(callback)
    }

    unsubscribe(callback: (changes: Change[]) => void): void {
        delete this.subscribers[this.subscribers.findIndex(item => item == callback)];
        this.subscribers.push(callback)
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify = (changes: Change[]) => {
        this.log.push(changes);
        for (const subscriber of this.subscribers) {
            subscriber(changes);
        }
    }

 }

