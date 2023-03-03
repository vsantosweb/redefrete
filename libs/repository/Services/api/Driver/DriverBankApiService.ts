import api from "..";
import { IDriverBankRepository } from '@redefrete/interfaces';
import { injectable } from "inversify";
import { Vehicle } from '@redefrete/types';

@injectable()

export class DriverBankApiService implements IDriverBankRepository {

    create(data: object, id:number|string[]|string) {
        return api().post(`/drivers/${id}/banks`, data).then(response => response.data)
    }

    update(data: object, id:number|string[]|string, bankId:number|string[]|string) {
        return api().patch(`/drivers/${id}/banks/${bankId}`, data).then(response => response.data)
    }

}