import { IRepository } from "../IRepository";

export type Vehicle = {};

export interface IVehicleRepository  {
  get(id: string): Promise<Vehicle | null>;

  checkVehicleExists(licencePlate: string): Promise<any>;
}