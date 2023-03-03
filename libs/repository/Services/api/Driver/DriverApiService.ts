
import { injectable } from "inversify";

import { IDriverRepository } from '@redefrete/interfaces';
import api from "..";
import { Driver } from "@redefrete/types";

@injectable()

export default class DriverApiService implements IDriverRepository {

  list = (params: string) => api().get('/drivers' + params).then(response => response.data)

  create = (data: Driver) => api().post('/drivers', data).then(response => response.data)

  update = (id: number | string[] | string, data: Driver) => api().patch('/drivers/' + id, data).then(response => response.data)

  show = async (id: number) => await api().get('/drivers/' + id).then(response => response.data)

  statusList = async () => await api().get('/driver-statuses').then(response => response.data)

  changeStatus = async (customerId: number, status: object) => {
    return await api().put(`/drivers/${customerId}/change-status`, status)
      .then(response => response.data)
  }

  liveSearch(email: string): Promise<any> {
    return api().post('/drivers/live-search', { email: email })
      .then(response => response.data.data)
  }

  rangeDate(dateRange: { date_from: string, date_to: string }): Promise<any> {
    return api().get('/drivers/overview/range-date?' + new URLSearchParams(dateRange).toString())
      .then(response => response.data.data)
  }

  hubsRangeDate(dateRange: { date_from: string, date_to: string }): Promise<any> {
    return api().get('/drivers/hubs/overview/range-date?' + new URLSearchParams(dateRange).toString())
      .then(response => response.data.data)
  }

  makeAddress = (data: object[], id: number | string[] | string) => api().patch('/drivers/' + id + '/address', data).then(response => response.data)
 
  makeLicence = (data: object[], id: number | string[] | string) => api().patch('/drivers/' + id + '/licence', data).then(response => response.data)

}