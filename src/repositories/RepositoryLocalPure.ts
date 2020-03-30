import { iAction } from "../dataModels/Action";
import { RsData, iRsData } from "../dataModels/RsData";
import { iRepository } from "../dataModels/iRepository";
import { claims } from "./reducers/claims";
import { claimEdges } from "./reducers/claimEdges";
import { RepositoryLocalBase } from "./RepositoryLocalBase";
import { scores } from "./reducers/scores";


export class RepositoryLocalPure extends RepositoryLocalBase implements iRepository {

    constructor(
        public rsData: iRsData = new RsData()
    ) {
        super(rsData);
    }

    async notify(actions: iAction[]) {
        //this.rsData.actionsLog.push({actions:actions}); //TODO: put logs back is
        for (const action of actions) {
            //TODO: add more reducers
            this.rsData = claims(this.rsData, action);
            this.rsData = claimEdges(this.rsData, action);
            this.rsData = scores(this.rsData, action);
        }
    }

}