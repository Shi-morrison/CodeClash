
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

// Import ENV information
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';


// Make GET request to recieve user data with user access token given.
const userInfo = async (token: any) => {

    // Request params to receive user data with given user access token.
    const uri = "https://api.github.com/user";
    const auth = `Bearer ${token}`;
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": auth
    };

    try {
        const result = await axios.get(uri, { headers });
        if (result.status === 200) {
            return result.data;
        } else {
            console.log(result);
            return {};
        }
    } catch (error) {
        console.error(error);

    }
};

// Exchange code from URL for user access token.
const exchangeCode = async (code: string) => {

    // Request params to exchange for user access token.
    const params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
    };
    // Make POST request with required params to oauth to receive user acess token.
    try {
        const result = await axios.post(
            'https://github.com/login/oauth/access_token',
            params,
            { headers: { 'Accept': 'application/json' } }
        );
        if (result.status === 200) {
            return result.data;
        } else {
            console.log(result);
            return {};
        }
    } catch (error) {
        console.error(error);
        return {};
    }
};


// oAuth - Make request to receive user data from Github Outh webflow.
export const oAuth = async (req: Request, res: Response): Promise<void> => {

    // Receive code from request URL to exchange for a user access token.
    const code = req.query.code;

    if (typeof code === 'string') {
        // Receive user access token by providing code from URL.
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

            const render = `Authorized but unable to exchange code ${code} tokendata ${tokenData.access_token}`;
            res.send(render);
        }

    }
    else {
        res.status(400).send('Bad Request');
    }

};