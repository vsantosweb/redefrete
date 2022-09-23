import { IRepository } from "../IRepository";

export type DriverVehicleProps = {
    vehicle_type_id?: string,
    brand?: string,
    model?: string,
    version?: string,
    manufacture_date?: string,
    licence_plate?: string,
    licence_number?: string,
    owner_document?: string,
    owner_name?: string,
    owner_phone?: string,
}

interface IDriverVehicleRepository extends IRepository<DriverVehicleProps>
{

}
