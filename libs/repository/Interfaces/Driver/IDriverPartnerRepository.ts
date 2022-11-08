import { IRepository } from "../IRepository";

export interface IDriverPartnerRepository {
    getVehiclePartners(): Promise<any>;
    invitePartner(data: { email: string, vehicle_id: number }): Promise<any>;
    inviteAction(action: 'accept' | 'reject' | 'exclude', uuid: string): Promise<any>;
}