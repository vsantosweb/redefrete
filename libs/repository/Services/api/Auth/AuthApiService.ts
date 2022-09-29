import { IAuthRepository } from "libs/repository/Interfaces/Auth/IAuthRepository";

export class AuthApiService implements IAuthRepository{
    
    login(credentials): Promise<any> {
        return api.post(AuthEndpoints.LOGIN, credentials)
            .then(response => {

                Cookie.set('token', response.data.data);
                return response.data;
            })
    }


    logout() {
        return api.post(AuthEndpoints.LOGOUT)
            .then(() => {
                Cookie.remove('token')
                this.redirect('/minha-conta/login')
            })
    }

    async session() {

        const token = await Cookie.get('token');

        if (token) {

            return await api.get(AuthEndpoints.SESSION)
                .then(response => response.data)
                .catch(() => false)
        }

        return false;

    }

    redirect() {
        
    }
}