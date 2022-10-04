
import Cookie from 'js-cookie';
import axios from 'axios';

type apiType = 'public' | null

export default function api(type: apiType = null) {

    const baseURL = type ? process.env.NEXT_PUBLIC_URL_API : process.env.NEXT_PUBLIC_URL_API_CLIENT

    const api = axios.create({ baseURL: baseURL });

    if (Cookie.get('token')) {

        api.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${Cookie.get('token')}`;
            return config;
        });

    }

    return api
}


