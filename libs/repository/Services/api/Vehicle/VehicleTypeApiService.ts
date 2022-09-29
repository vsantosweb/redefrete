
import { injectable } from "inversify";

import { IVehicleTypeRepository } from '@redefrete/interfaces';
import api from "..";

@injectable()

export default class VehicleTypeApiService implements IVehicleTypeRepository {

    get = () => api.get('/vehicle-types').then(response => response.data.data)
}