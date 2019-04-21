import { Claim } from "./Claim";
import { ClaimEdge } from "./ClaimEdge";
import { Score } from "./Score";
import { View } from "./View";
import { ViewEdge } from "./viewEdge";

export class RSData {
    constructor(
        public claims: Claim[] = [],
        public claimEdges: ClaimEdge[] = [],
        public history: Date[] = [],
        public scores: Score[] = [],
        public views: View[] = [],
        public viewEdges: ViewEdge[] = [],
    ) {
    }
}