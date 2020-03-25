import { iClaimEdge, ClaimEdge } from "../dataModels/ClaimEdge";
import { iScore, Score } from "../dataModels/Score";
import { RsData, iRsData } from "../dataModels/RsData";
import { iRepository } from "../dataModels/iRepository";
import { iAction, Action } from "../dataModels/Action";
import { iClaim } from "../dataModels/Claim";
import { RepositoryLocalBase } from "./RepositoryLocalBase";
import { ActionTypes } from "../dataModels/ActionTypes";


export class RepositoryLocalReactive extends RepositoryLocalBase implements iRepository {

    constructor(
        public rsData: iRsData = new RsData()
    ) {
        super(rsData);
    }

    notify(actions: iAction[]): void {
        this.rsData.actionsLog.push(actions);
        for (const action of actions) {
            // "add_claim" |
            if (action.type == "add_claim" ||
                action.type == "modify_claim") {
                this.rsData.claims[action.dataId] = action.newData
            }
            if (action.type == "delete_claim") {
                throw new Error("Method not implemented.");
            }
            if (action.type == "add_claimEdge" ||
                action.type == "modify_claimEdge") {
                this.rsData.claimEdges[action.dataId] = action.newData
                const item = action.newData as ClaimEdge;
                this.indexClaimEdgeIdByParentId(item);
                this.indexClaimEdgeIdByChildId(item);
            }
            if (action.type == "delete_claimEdge") {
                throw new Error("Method not implemented.");
            }
            if (action.type == "add_score" ||
                action.type == "modify_score") {
                const item = action.newData as Score;
                this.rsData.scores[action.dataId] = action.newData
                this.scoreIdsByClaimId(item);
                this.childIdsByScoreId(item);
            }
            if (action.type == "delete_score") {
                throw new Error("Method not implemented.");
            }
        }
    }

    private indexClaimEdgeIdByParentId(claimEdge: ClaimEdge) {
        let indexId = claimEdge.parentId;
        let id = claimEdge.id
        let destination = this.rsData.claimEdgeIdsByParentId[claimEdge.parentId];
        if (!destination) {
            destination = [];
            this.rsData.claimEdgeIdsByParentId[claimEdge.parentId] = destination;
        }
        if (!destination.includes(claimEdge.id)) {
            destination.push(claimEdge.id)
        }
    }

    private indexClaimEdgeIdByChildId(claimEdge: ClaimEdge) {
        let indexId = claimEdge.childId;
        let id = claimEdge.id;
        let destination = this.rsData.claimEdgeIdsByChildId[indexId];
        if (!destination) {
            destination = [];
            this.rsData.claimEdgeIdsByChildId[indexId] = destination;
        }
        if (!destination.includes(id)) {
            destination.push(id)
        }
    }

    private scoreIdsByClaimId(score: iScore) {
        let indexId = score.sourceClaimId;
        let id = score.id;
        let destination = this.rsData.scoreIdsByClaimId[indexId];
        if (!destination) {
            destination = [];
            this.rsData.scoreIdsByClaimId[indexId] = destination;
        }
        if (!destination.includes(id)) {
            destination.push(id)
        }
    }

    //TODO: not sure if this is correct
    private childIdsByScoreId(score: iScore) {
        let indexId = score.parentScoreId;
        let id = score.id;
        if (indexId) {
            let destination = this.rsData.childIdsByScoreId[indexId];
            if (!destination) {
                destination = [];
                this.rsData.childIdsByScoreId[indexId] = destination;
            }
            if (!destination.includes(id)) {
                destination.push(id)
            }
        }
    }

}