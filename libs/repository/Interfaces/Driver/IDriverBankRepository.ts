export interface IDriverBankRepository {
    create(data:object, id:number|string[]|string): Promise<any>
    update(data: object, id:number|string[]|string, bankId:number|string[]|string): Promise<any>
}
