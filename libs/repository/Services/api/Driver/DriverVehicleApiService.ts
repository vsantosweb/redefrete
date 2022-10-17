import api from "..";
import { IDriverVehicleRepository } from '@redefrete/interfaces';
import { injectable } from "inversify";
import { Vehicle } from 'libs/Types';

@injectable()

export class DriverVehicleApiService implements IDriverVehicleRepository {

    getVehicles(): Promise<any> {
        return api().get('/driver/vehicles').then(response => response.data)
    }

    showVehicle(licencePlate: string): Promise<any> {
        return api().get('/driver/vehicles/' + licencePlate).then(response => response.data)
    }

    createVehicle(data: Vehicle): Promise<any> {
        return api().post('/driver/vehicles', data).then(response => response.data)
    }

    deleteVehicle(id: number): Promise<any> {
        return api().delete('/driver/vehicles/' + id).then(response => response.data)
    }
}