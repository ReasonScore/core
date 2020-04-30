import { RsData } from "../dataModels/RsData";
export declare function selectNode(selectedId: string, rsData: RsData): selectedStatus[];
export declare type selectedStatus = {
    itemId: string;
    status: selectedStatuses;
};
export declare type selectedStatuses = "selected" | "ancestor" | "child" | "main";
