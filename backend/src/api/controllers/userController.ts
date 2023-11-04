import User from '../../db/models/userModel';
import { Request, Response } from 'express';

// Log in logic
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // Assume you have some validation and hashing logic here
        // ...

        // If the user is valid, send back the user object
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};