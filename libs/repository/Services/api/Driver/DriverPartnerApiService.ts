import { injectable } from "inversify";
import { IDriverPartnerRepository } from "@redefrete/interfaces";
import api from "..";

@injectable()

export class DriverPartnerApiService implements IDriverPartnerRepository {
    
    invitePartner(data: { email: string, vehicle_id: number }): Promise<any> {
        return api().post('/drivers/partners/invite', data).then(response => response.data)
    }

    inviteAction(action: "accept" | "reject" | "exclude", uuid: string): Promise<any> {
        return api().put(`/drivers/partners/invite/${uuid}?action=${action}`).then(response => response.data)
        
    }

    getVehiclePartners(): Promise<any> {
        return api().get(`/drivers/partners`).then(response => response.data)
        
    }
}