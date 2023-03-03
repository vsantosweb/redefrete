import { IRepository } from "../IRepository";
import { Driver } from '@redefrete/types'
export interface IDriverRepository {
    create(data:Driver): Promise<any>
    update(id:number|string[]|string, data:Driver): Promise<any>
    list(params: string): Promise<any>;
    show(id: number | string | string[]): Promise<any>;
    statusList(): Promise<any>;

    /** Put method to change driver status */
    changeStatus(customerId: number | string | string[], status: object): Promise<any>

    /** Post methods to search drivers */
    liveSearch(email: string): Promise<any>

    rangeDate(dateRange: { date_from: string, date_to: string }): Promise<any>
    hubsRangeDate(dateRange: { date_from: string, date_to: string }): Promise<any>
    makeAddress( data:object[], id:number|string[]|string): Promise<any>
    makeLicence( data:object[], id:number|string[]|string): Promise<any>
    
}