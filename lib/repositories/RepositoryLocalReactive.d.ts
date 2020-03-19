import { iRsData } from "../dataModels/RsData";
import { iRepository } from "../dataModels/iRepository";
import { iAction } from "../dataModels/Action";
import { RepositoryLocalBase } from "./RepositoryLocalBase";
export declare class RepositoryLocalReactive extends RepositoryLocalBase implements iRepository {
    rsData: iRsData;
    constructor(rsData?: iRsData);
    notify(actions: iAction[]): void;
    private indexClaimEdgeIdByParentId;
    private indexClaimEdgeIdByChildId;
    private scoreIdsByClaimId;
    private childIdsByScoreId;
}
