import { Vehicle } from '@redefrete/types';
export interface IDriverVehicleRepository {
    getVehicles(): Promise<any>
    createVehicle(data: Vehicle): Promise<any>
    showVehicle(licencePlate: string): Promise<any>
    deleteVehicle(id: number): Promise<any>
}
