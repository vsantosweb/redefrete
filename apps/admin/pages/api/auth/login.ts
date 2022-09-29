
import type { NextApiRequest, NextApiResponse } from "next";

import api from ".."

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const session = await (await api.post('/user/auth/login', req.body)).data

        res.setHeader('set-cookie', `token=${session.data}`)
        
        res.redirect('/');

        return res.status(200).json(session);
        
    } catch (error) {

        return res.status(401).json(error.response.data);
    }
}