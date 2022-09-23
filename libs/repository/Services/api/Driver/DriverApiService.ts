
import { injectable } from "inversify";

import { IDriverRepository } from '@redefrete/interfaces';

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

}