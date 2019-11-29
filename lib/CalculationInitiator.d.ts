import { Change } from "./dataModels/Change";
import { iRepository } from "./dataModels/iRepository";
export declare class CalculationInitator {
    repo: iRepository;
    subscriber: ((changes: Change[]) => void) | undefined;
    constructor(repo: iRepository, subscriber?: ((changes: Change[]) => void) | undefined);
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): Promise<void>;
    private CalculationInitiator;
    private CalculateByClaimId;
}
