import { injectable } from "inversify";
import { IDriverLicenceRepository } from "@redefrete/interfaces";
import api from "..";
import axios from "axios";

@injectable()

export class DriverLicenceApiService implements IDriverLicenceRepository {
    getCategories(): Promise<any> {
        return api('public').get('/licence-categories')
            .then(response => {

                return response.data.data;
            })
    }
}