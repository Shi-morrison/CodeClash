
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

const parseResponse = (response: any) => {
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response);
        return {};
    }
};

const exchangeCode = async (code: string) => {
    const params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
    };
    try {
        const result = await axios.post(
            'https://github.com/login/oauth/access_token',
            params,
            { headers: { 'Accept': 'application/json' } }
        );
        return parseResponse(result);
    } catch (error) {
        console.error(error);
        return {};
    }
};

// Oauth logic
export const oAuth = async (req: Request, res: Response): Promise<void> => {
    const code = req.query.code;

    if (typeof code === 'string') {
        res.send("code: " + code);
    }
    else {
        res.status(400).send('Bad Request');
    }

};