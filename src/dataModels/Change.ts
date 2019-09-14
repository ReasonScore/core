import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { Score } from "./Score";

export class Change {
    constructor(
        public newItem: (ClaimEdge | Claim | Score),
        public oldItem?: (ClaimEdge | Claim | Score),
    ) {
    }
}