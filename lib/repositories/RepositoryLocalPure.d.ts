import { Action } from "../dataModels/Action";
import { RsData } from "../dataModels/RsData";
import { iRepository } from "../dataModels/iRepository";
import { RepositoryLocalBase } from "./RepositoryLocalBase";
export declare class RepositoryLocalPure extends RepositoryLocalBase implements iRepository {
    rsData: RsData;
    constructor(rsData?: RsData);
    notify(actions: Action[]): Promise<void>;
}
