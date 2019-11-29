import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";
import { Score, iScore } from "./Score";
import { Id } from "./Id";
import { Item } from "./Item";

export class Change {
    constructor(
        public newItem: Item ,
        public oldItemVersion?: Id,
    ) {
    }
}