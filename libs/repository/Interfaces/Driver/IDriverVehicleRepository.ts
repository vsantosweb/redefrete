import { Vehicle } from '@redefrete/types';
export interface IDriverVehicleRepository {
    getVehicles(): Promise<any>
    createVehicle(data: Vehicle, driverId?:number | null): Promise<any>
    showVehicle(licencePlate: string): Promise<any>
    deleteVehicle(driverid:null|number, id: number): Promise<any>
}
