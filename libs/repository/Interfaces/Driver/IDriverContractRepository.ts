import { IRepository } from "../IRepository";

export interface IDriverContractRepository {
    get(params:string): Promise<any>;

}