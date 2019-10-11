import { Change } from "./dataModels/Change";
import { Repository } from "./Repository";
import { Messenger } from "./messenger";
export declare class CalculationLooper {
    private messenger?;
    private repo;
    constructor(repo: Repository, messenger?: Messenger);
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): void;
    private calcLoop;
    private calculateFromClaimEdge;
}
