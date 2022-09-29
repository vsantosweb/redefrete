
import { injectable } from "inversify";

import { ICaptureLead } from '@redefrete/interfaces';
import api from "./";

@injectable()

export default class CaptureLeadApiService implements ICaptureLead {

    get = () => api.get('/capture-leads').then(response => response.data.data)
}