import { IDriverContractRepository } from "@redefrete/interfaces";
import { injectable } from "inversify";
import api from "..";

@injectable()

export class DriverContractApiService implements IDriverContractRepository {

    get(params:string): Promise<any> {
        return api().get('/driver-contracts'+params).then(response => response.data)
    }
}