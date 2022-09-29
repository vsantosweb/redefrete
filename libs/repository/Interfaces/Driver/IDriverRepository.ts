import { IRepository } from "../IRepository";

 export interface IDriverRepository  {
    list();
    show(id): Promise<any>;
    statusList(): Promise<any>;
}