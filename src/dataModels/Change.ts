import { ClaimEdge } from "./ClaimEdge";
import { Claim } from "./Claim";

export class Change {
    constructor(
        public versionId: string,
        public oldItem: (ClaimEdge | Claim),
        public newItem: (ClaimEdge | Claim),
    ) {
    }
}