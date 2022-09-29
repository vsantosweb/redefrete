
import { injectable } from "inversify";

import { IDriverRepository } from '@redefrete/interfaces';
import api from "..";

@injectable()

export default class DriverApiService implements IDriverRepository {

  driver
  licence
  address
  driver_bank
  password
  vehicle
  name: string
  email: string
  phone: string

  list = () => api.get('/drivers').then(response => response.data.data)
  show = async (id: number) => await api.get('/drivers/' + id).then(response => response.data)
  statusList = async () => await api.get('/driver-statuses').then(response => response.data)

}