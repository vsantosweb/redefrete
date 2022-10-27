
import { injectable } from "inversify";

import { IDriverRepository } from '@redefrete/interfaces';
import api from "..";

@injectable()

export default class DriverApiService implements IDriverRepository {

  list = () => api().get('/drivers').then(response => response.data.data)

  show = async (id: number) => await api().get('/drivers/' + id).then(response => response.data)

  statusList = async () => await api().get('/driver-statuses').then(response => response.data)

  changeStatus = async (customerId: number, status: object) => {
   return await api().put(`/drivers/${customerId}/change-status`, status)
      .then(response => response.data)
  }

  liveSearch(email: string): Promise<any> {
    return api().post('/drivers/live-search', {email: email})
    .then(response => response.data.data)
  }

}