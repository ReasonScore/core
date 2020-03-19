import { Change } from "./dataModels/Change";
import { Score } from "./dataModels/Score";
import { Id } from "./dataModels/Id";
import { iRepository } from "./dataModels/iRepository";
export declare class CalculationInitator {
    repo: iRepository;
    subscriber: ((changes: Change[]) => void) | undefined;
    constructor(repo: iRepository, subscriber?: ((changes: Change[]) => void) | undefined);
    /** this function can be called by outside code to notfy this repository of changes */
    notify(changes: Change[]): Promise<void>;
    private CalculationInitiator;
    CalculateByClaimId(parentId: Id): Promise<Score>;
}
