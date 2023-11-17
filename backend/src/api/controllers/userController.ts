import User from '../../db/models/userModel';
import { Request, Response } from 'express';



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

// Updating wins method

export const updateStats = async (userId: String): Promise<void> => {
    try {
        const user = await User.findOne({ githubId: userId })
        if (user) {
            const gamesPlayed = user.gamesPlayed + 1;
            user.wins = gamesPlayed - user.wins;
            user.losses = gamesPlayed - user.losses;
            user.gamesPlayed = gamesPlayed;
            await user.save();
        }
    } catch (error: any) {

    }
};

