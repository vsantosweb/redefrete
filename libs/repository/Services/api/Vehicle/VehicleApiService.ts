import { injectable } from "inversify";

import api from "..";
import { IVehicleRepository } from "libs/repository/Interfaces/Vehicle/IVehicleRepository";

@injectable()

export default class VehicleApiService implements IVehicleRepository {

    get = () => api('public').get('/vehicle-types').then(response => response.data.data)

    checkVehicleExists(licencePlate: string){
        return api('public').get(`/check-vehicle-exists/${licencePlate}`).then(response => response.data)
    }
}