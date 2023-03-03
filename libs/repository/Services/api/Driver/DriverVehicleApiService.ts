import api from "..";
import { IDriverVehicleRepository } from '@redefrete/interfaces';
import { injectable } from "inversify";
import { Vehicle } from '@redefrete/types';

@injectable()

export class DriverVehicleApiService implements IDriverVehicleRepository {

    getVehicles(): Promise<any> {
        return api().get('/drivers/vehicles').then(response => response.data)
    }

    showVehicle(licencePlate: string): Promise<any> {
        return api().get('/drivers/vehicles/' + licencePlate).then(response => response.data)
    }

    createVehicle(data: Vehicle, driverId = null): Promise<any> {
        if (driverId) return api().post(`/drivers/${driverId}/vehicles`, data).then(response => response.data)
        return api().post('/drivers/vehicles', data).then(response => response.data)
    }

    deleteVehicle(id: number): Promise<any> {
        return api().delete('/drivers/vehicles/' + id).then(response => response.data)
    }
}