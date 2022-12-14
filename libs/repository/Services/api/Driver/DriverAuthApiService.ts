import { injectable } from "inversify";
import api from "..";
import { IDriverAuthRepository } from '@redefrete/interfaces';

import Cookie from 'js-cookie';

export enum AuthEndpoints {
    LOGIN = '/drivers/auth/login',
    LOGOUT = '/drivers/auth/logout',
    SESSION = '/drivers/auth/session',
    SAMPLE_REGISTER = '/drivers/auth/register',
    COMPLETE_REGISTER = '/drivers/auth/register/complete',
    VERIFY_REGISTER = '/drivers/auth/register/verify?trackid='
}

@injectable()

export class DriverAuthApiService implements IDriverAuthRepository {


    login(credentials: { email: string, password: string }): Promise<any> {
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

    redirect(to: string): void {
        window.location.href = to || '/'
    }

    redirectToLogin(): void {
        this.redirect('/minha-conta/login')
    }

    sampleRegister(data: any): Promise<any> { return api().post(AuthEndpoints.SAMPLE_REGISTER, data) }

    completeRegister(data: any): Promise<any> { return api().post(AuthEndpoints.COMPLETE_REGISTER, data) }

    verifyAccountRegister(uuid: string): Promise<any> {
        return api().get(AuthEndpoints.VERIFY_REGISTER + uuid)
    }
}