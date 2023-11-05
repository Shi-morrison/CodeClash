
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

const userInfo = async (token: any) => {
    const uri = "https://api.github.com/user";

    const auth = `Bearer ${token}`;
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": auth
    };

    try {
        const result = await axios.get(uri, { headers });
        return parseResponse(result);
    } catch (error) {
        console.error(error);
        // Handle error as needed
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
        const tokenData = await exchangeCode(code);

        if (tokenData.access_token) {
            const token = tokenData.access_token;
            const userDetails = await userInfo(token);
            const handle = userDetails.login
            const name = userDetails.name
            console.log(userDetails);
            const render = `Sucessfully authorized! Got name ${name} and handle ${handle}`;
            res.send(render);
        } else {
            console.log("this is token:", tokenData)
            const render = `Authorized but unable to exchange code ${code} tokendata ${tokenData.access_token}`;
            res.send(render);
        }

    }
    else {
        res.status(400).send('Bad Request');
    }

};