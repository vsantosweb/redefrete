import Axios from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import api from '../pages/api';

type SignInCredentials = {
    email: string;
    password: string;
}

export enum AuthEndpoints {
    LOGIN = '/drivers/auth/login',
    LOGOUT = '/drivers/auth/logout',
    SESSION = '/drivers/auth/session'
}

interface JWTtoken { token: string }


const signIn = async ({ email, password }: SignInCredentials) => api.post(AuthEndpoints.LOGIN, { email, password })
    .then(response => {

        Cookie.set('token', response.data.data);
        return response.data;
    })


const signOut = async (redirect: '/minha-conta/login') => api.post('/driver/auth/logout')
    .then(() => {
        Cookie.remove('token')
        Router.push(redirect)
    })



async function session() {

    const token = await Cookie.get('token');

    if (token) {

        return await api.get('/drivers/auth/session')
            .then(response => response.data)
            .catch(() => false)
    }

    return false;

}
export const authService = { signIn, signOut, session }