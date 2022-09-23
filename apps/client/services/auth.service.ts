import Axios from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import api from '../pages/api';

type SignInCredentials = {
    email: string;
    password: string;
}

export enum AuthEndpoints {
    LOGIN = '/driver/auth/login',
    LOGOUT = '/driver/auth/logout',
    SESSION = '/driver/auth/session'
}

interface JWTtoken { token: string }


const signIn = async ({ email, password }: SignInCredentials) => api.post(AuthEndpoints.LOGIN, { email, password })
    .then(response => {

        Cookie.set('token', response.data.data);
        return response.data;
    })


const signOut = async (redirect: string = '/minha-conta/login') => api.post('/driver/auth/logout')
    .then(() => {
        Cookie.remove('token')
        Router.push(redirect)
    })



async function session() {

    const token = await Cookie.get('token');

    if (token) {

        return await api.get('/driver/auth/session')
            .then(response => response.data)
            .catch(() => false)
    }

    return false;

}
export const authService = { signIn, signOut, session }