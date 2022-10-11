import api from "..";
import {  IDriverVehicleRepository } from '@redefrete/interfaces';
import { injectable } from "inversify";

@injectable()

export class DriverVehicleApiService implements IDriverVehicleRepository {

    getVehicles(): Promise<any> {
        return api().get('/driver/vehicles').then(response => response.data)
    }

    createVehicle(data): Promise<any>{
        return api().post('/driver/vehicles', data).then(response => response.data)
    }

}