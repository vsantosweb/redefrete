import api from "..";
import { DriverVehicleProps, IDriverVehicleRepository } from "../../../Interfaces/Driver/IDriverVehicleRepository";


export class DriverVehicleApiService implements IDriverVehicleRepository
{
    get(id: string): Promise<DriverVehicleProps> {
        return
    }
    
    create(data: string): Promise<DriverVehicleProps> {
        return
    }
}