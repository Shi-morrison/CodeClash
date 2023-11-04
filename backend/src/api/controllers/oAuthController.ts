
import { Request, Response } from 'express';

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