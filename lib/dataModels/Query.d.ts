import { Change } from "./Change";
export interface Query {
    start?: Date;
    end?: Date;
    depth?: number;
    claimId: number;
    viewOnly: boolean;
    update: () => Change[];
}
