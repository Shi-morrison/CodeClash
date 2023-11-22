import User from '../../db/models/userModel';
import { Request, Response } from 'express';
import { getTempToken } from "../../websocket";
import { isValidObjectId } from "mongoose";

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.isAuthenticated()) {
            res.json({ user: req.user });
        } else {
            res.status(401).json({ error: 'User not authenticated' });
        }
    } catch (error: any) {
        res.status(500).send(" ERROR BUDDY" + error)
    }

}

export const getTemporaryAuthToken = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.isAuthenticated()) {
            const id = (req.user as any)._id;
            if (isValidObjectId(id)) {
                res.json({ token: getTempToken(id) });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            res.status(401).json({ error: 'User not authenticated' });
        }
    } catch (error: any) {
        res.status(500).send(" ERROR BUDDY" + error)
    }

}


export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.isAuthenticated()) {
            const users = await User.find().sort({ elo: -1 }).limit(10);
            res.json(users);
        } else {
            res.status(401).json({ error: 'User not authenticated' });
        }
    } catch (error: any) {
        res.status(500).send(" ERROR BUDDY" + error)
    }

}
