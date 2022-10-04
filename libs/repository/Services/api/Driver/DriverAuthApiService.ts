import { injectable } from "inversify";
import api from "..";
import {  IDriverAuthRepository } from '@redefrete/interfaces';

import Cookie from 'js-cookie';
import DriverApiService from "./DriverApiService";

export enum AuthEndpoints {
    LOGIN = '/driver/auth/login',
    LOGOUT = '/driver/auth/logout',
    SESSION = '/driver/auth/session',
    SAMPLE_REGISTER = '/driver/auth/register',
    COMPLETE_REGISTER = '/driver/auth/register/complete'
}

@injectable()

export class DriverAuthApiService implements IDriverAuthRepository {



    login(credentials): Promise<any> {
        return api().post(AuthEndpoints.LOGIN, credentials)
            .then(response => {

                Cookie.set('token', response.data.data);
                return response.data;
            })
    }


    logout() {
        return api().post(AuthEndpoints.LOGOUT)
            .then(() => {
                Cookie.remove('token')
                this.redirect('/minha-conta/login')
            })
    }

    async session() {

        const token = await Cookie.get('token');

        if (token) {

            return await api().get(AuthEndpoints.SESSION)
                .then(response => response.data)
                .catch(() => false)
        }

        return false;

    }

    redirect(to = null) {
        window.location.href = to || '/'
    }

    sampleRegister(data): Promise<any> { return api().post(AuthEndpoints.SAMPLE_REGISTER, data) }

    completeRegister(data): Promise<any> { return api().post(AuthEndpoints.COMPLETE_REGISTER, data) }
}