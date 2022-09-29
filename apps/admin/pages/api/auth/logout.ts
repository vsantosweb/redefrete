
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from 'cookie'

import api from ".."

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const session = await api.post('/user/auth/logout', null, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        })

        res.setHeader('set-cookie', `token=null`)
        res.redirect('/account/login')
        
        return res.status(200).json(session);

    } catch (error) {

        return res.status(401).json(error);
    }

}