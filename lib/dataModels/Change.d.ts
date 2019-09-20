import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { Score } from "./Score";
export declare class Change {
    newItem: (ClaimEdge | Claim | Score);
    oldItem?: Score | ClaimEdge | Claim | undefined;
    constructor(newItem: (ClaimEdge | Claim | Score), oldItem?: Score | ClaimEdge | Claim | undefined);
}
