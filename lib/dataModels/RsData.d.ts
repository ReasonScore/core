import { Claim } from "./Claim";
import { ClaimEdge } from "./ClaimEdge";
import { Score } from "./Score";
import { View } from "./View";
import { ViewEdge } from "./viewEdge";
export declare class RsData {
    claims: Claim[];
    claimEdges: ClaimEdge[];
    history: Date[];
    scores: Score[];
    views: View[];
    viewEdges: ViewEdge[];
    constructor(claims?: Claim[], claimEdges?: ClaimEdge[], history?: Date[], scores?: Score[], views?: View[], viewEdges?: ViewEdge[]);
}
