import { iAction } from "../dataModels/Action";
import { iRsData } from "../dataModels/RsData";
import { iRepository } from "../dataModels/iRepository";
import { RepositoryLocalBase } from "./RepositoryLocalBase";
export declare class RepositoryLocalPure extends RepositoryLocalBase implements iRepository {
    rsData: iRsData;
    constructor(rsData?: iRsData);
    notify(actions: iAction[]): Promise<void>;
}
