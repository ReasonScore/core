import { iClaimEdge, ClaimEdge } from "./dataModels/ClaimEdge";
import { iAction } from "./dataModels/Action";
import { iScore } from "./dataModels/Score";
import { RsData, iRsData } from "./dataModels/RsData";
import { iRepository } from "./dataModels/iRepository";
import { iClaim } from "./dataModels/Claim";
import { claims } from "./reducers/claims";
import { claimEdges } from "./reducers/claimEdges";
import { BaseRepository } from "./BaseRepository";


export class PureRepository extends BaseRepository implements iRepository {

    constructor(
        public rsData: iRsData = new RsData()
    ) {
        super(rsData);
    }

    async notify(actions: iAction[]) {
        for (const action of actions) {
            //TODO: add more reducers
            this.rsData = claims(this.rsData, action);
            this.rsData = claimEdges(this.rsData, action);
        }
    }

}