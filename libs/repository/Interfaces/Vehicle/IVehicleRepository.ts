import { IRepository } from "../IRepository";

export type Vehicle = {};

export interface IVehicleRepository extends IRepository<Vehicle> {
    get(id: string): Promise<Vehicle | null>;
  }