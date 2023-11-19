import User from '../../db/models/userModel';
import { Request, Response } from 'express';

interface EloRatingResult {
    newRating1: number;
    newRating2: number;
}

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

export const matchResults = async (req: Request, res: Response): Promise<void> => {

    if (req.isAuthenticated()) {
        try {
            const { winnerId, loserId } = req.body;

            const winner = await User.findById(winnerId);
            const loser = await User.findById(loserId);

            if (!winner || !loser) {
                res.status(404).send('User not found');
            }

            const { newRating1: newWinnerRating, newRating2: newLoserRating } = calculateEloRating(winner.elo, loser.elo, 1);

            winner.elo = newWinnerRating;
            loser.elo = newLoserRating;
            winner.rank = determineRank(newWinnerRating);
            loser.rank = determineRank(newLoserRating);

            await winner.save();
            await loser.save();

            res.send({ winner: newWinnerRating, loser: newLoserRating, winnerRank: winner.rank, loserRank: loser.rank });
        } catch (error) {
            console.error('Error updating Elo ratings:', error);
            res.status(500).send('Error updating ratings');
        }
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
}

function determineRank(elo: number): string {
    if (elo < 1500) return 'bronze';
    if (elo < 2000) return 'silver';
    return 'gold';
}
// Updating wins method
function calculateEloRating(player1Rating: number, player2Rating: number, matchResult: number, kFactor: number = 32): EloRatingResult {
    const expectedScore1 = 1 / (1 + Math.pow(10, (player2Rating - player1Rating) / 400));
    const newRating1 = player1Rating + kFactor * (matchResult - expectedScore1);

    const expectedScore2 = 1 - expectedScore1;
    const newRating2 = player2Rating + kFactor * ((1 - matchResult) - expectedScore2);

    return { newRating1, newRating2 };
}

