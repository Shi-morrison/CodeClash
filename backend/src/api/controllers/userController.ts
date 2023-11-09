import User from '../../db/models/userModel';
import { Request, Response } from 'express';





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

