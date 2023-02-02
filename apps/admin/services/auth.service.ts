import Axios from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import api from '../pages/api';

type SignInCredentials = {
    email: string;
    password: string;
}

export enum AuthEndpoints {
    LOGIN = '/user/auth/login',
    LOGOUT = '/user/auth/logout',
    SESSION = '/user/auth/session'
}

interface JWTtoken { token: string }


const signIn = async ({ email, password }: SignInCredentials) => api.post(AuthEndpoints.LOGIN, { email, password })
    .then(response => {
        Cookie.set('token', response.data.data);
        return response.data;
    })


const signOut = async (redirect: string = '/account/login') => api.post('/user/auth/logout')
    .then(() => {
        Cookie.remove('token')
        Router.push(redirect)
    })



async function session() {

    const token = await Cookie.get('token');

    if (token) {

        return await api.get('/user/auth/session')
            .then(response => response.data)
            .catch(() => false)
    }

    return false;

}
export const authService = { signIn, signOut, session }