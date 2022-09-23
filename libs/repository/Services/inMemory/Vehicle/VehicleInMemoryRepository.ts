import { injectable } from "inversify";
import { IRepository } from "../../../Interfaces/IRepository";
import { Vehicle } from "../../../Interfaces/Vehicle/IVehicleRepository";

// @injectable()
// export class VehicleInMemoryRepository implements IRepository<Vehicle> {
//     async get(id: string): Promise<Vehicle | null> {
//         try {
//             const response = await fetch(`https://randomuser.me/api?id=${id}`);
//             if (!response.ok) throw new Error(response.statusText);

//             const json = await response.json();
//             const data = json as {
//                 results:[];
//             }

//             return [];
//         } catch (e) {
//             throw Error(`Error in UserRepository calling get with id ${id}: ${e}`);
//         }
//     }

//     async show(id: string): Promise<Vehicle | null> {
//         try {
//             const response = await fetch(`https://randomuser.me/api?id=${id}`);
//             if (!response.ok) throw new Error(response.statusText);

//             const json = await response.json();
//             const data = json as {
//                 results:[];
//             }

//             return [];
//         } catch (e) {
//             throw Error(`Error in UserRepository calling get with id ${id}: ${e}`);
//         }
//     }
// }