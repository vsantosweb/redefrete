import { IRepository } from "../IRepository";

export interface IDriverRepository {
    list(): Promise<any>;
    show(id:number| string | string[]): Promise<any>;
    statusList(): Promise<any>;

    /** Put method to change driver status */
    changeStatus(customerId: number| string | string[], status: object): Promise<any>

    /** Post methods to search drivers */
    liveSearch(email: string): Promise<any>
}