import { Action } from "./dataModels/Action";

export class Messenger {
    public readonly subscribers: { (changes: Action[]): void; }[] = []
    public readonly actionsLog: Action[][] = [];

    subscribe(callback: (actions: Action[]) => void): void {
        this.subscribers.push(callback)
    }

    unsubscribe(callback: (actions: Action[]) => void): void {
        const index = this.subscribers.indexOf(callback, 0);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    /** this function can be called by outside code to notfy this repository of changes */
    notify = (actions: Action[]) => {
        this.actionsLog.push(actions);
        for (const subscriber of this.subscribers) {
            subscriber(actions);
        }
    }

}

