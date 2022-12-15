
import { injectable } from "inversify";

import { ICaptureLead } from '@redefrete/interfaces';
import api from "./";

@injectable()

export default class CaptureLeadApiService implements ICaptureLead {

    get = (params:string) => api().get('/capture-leads'+params).then(response => response.data)
}