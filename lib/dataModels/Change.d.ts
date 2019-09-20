import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { Score } from "./Score";
export declare class Change {
    newItem: (ClaimEdge | Claim | Score);
    oldItem?: ClaimEdge | Claim | Score | undefined;
    constructor(newItem: (ClaimEdge | Claim | Score), oldItem?: ClaimEdge | Claim | Score | undefined);
}
