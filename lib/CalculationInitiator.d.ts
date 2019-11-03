import { Change } from "./dataModels/Change";
import { Repository } from "./Repository";
export declare class CalculationInitator {
    repo: Repository;
    subscriber: ((changes: Change[]) => void) | undefined;
    constructor(repo: Repository, subscriber?: ((changes: Change[]) => void) | undefined);
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): void;
    private CalculationInitiator;
    private CalculateByClaimId;
}
