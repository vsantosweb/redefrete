
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from 'cookie'

import api from ".."

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        
        const session =   await api.get('/user/auth/session', {
            headers:{
                Authorization: `Bearer ${req.cookies.token}`
            }
        })

        return res.status(200).json(session.data);
        
    } catch (error) {

        res.setHeader('set-cookie', `token=null`)
        // res.redirect('/account/login')

        return res.status(401).json(error.response.data);

    }
    
}