import User from '../../db/models/userModel';
import { Request, Response } from 'express';



// saveUser - Receive request body and mapping the data to the user schema.
export const saveUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Map to user using User schema.
        const user = new User(req.body);

        // Save to database.
        await user.save();
        res.status(201).send(user);

    } catch (error: any) {
        // Catch error.
        res.status(500).send({ error: error.message });
    }
};


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

