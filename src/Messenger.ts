import { Change } from "./dataModels/Change";

export class Messenger {
    public readonly subscribers: { (changes: Change[]): void; }[] = []
    public readonly log: Change[][] = [];

    subscribe(callback: (changes: Change[]) => void): void {
        this.subscribers.push(callback)
    }

    unsubscribe(callback: (changes: Change[]) => void): void {
        const index = this.subscribers.indexOf(callback, 0);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify = (changes: Change[]) => {
        this.log.push(changes);
        for (const subscriber of this.subscribers) {
            subscriber(changes);
        }
    }

}

