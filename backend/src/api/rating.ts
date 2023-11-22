import User from '../db/models/userModel';

export async function updateRatings({ winnerId, loserId }: { winnerId: string, loserId: string }) {
    const winner = await User.findById(winnerId);
    const loser = await User.findById(loserId);

    if (!winner || !loser) {
        throw new Error("this should never happen");
    }

    const { newRating1: newWinnerRating, newRating2: newLoserRating } = calculateEloRating(winner.elo, loser.elo, 1);

    winner.elo = newWinnerRating;
    loser.elo = newLoserRating;
    winner.rank = determineRank(newWinnerRating);
    loser.rank = determineRank(newLoserRating);

    await winner.save();
    await loser.save();

    return { winner: newWinnerRating, loser: newLoserRating, winnerRank: winner.rank, loserRank: loser.rank };
}

export function determineRank(elo: number): string {
    if (elo < 1500) return 'bronze';
    if (elo < 2000) return 'silver';
    return 'gold';
}

interface EloRatingResult {
    newRating1: number;
    newRating2: number;
}

// Updating wins method
function calculateEloRating(player1Rating: number, player2Rating: number, matchResult: number, kFactor: number = 32): EloRatingResult {
    const expectedScore1 = 1 / (1 + Math.pow(10, (player2Rating - player1Rating) / 400));
    const newRating1 = Math.round(player1Rating + kFactor * (matchResult - expectedScore1));


    const expectedScore2 = 1 - expectedScore1;
    const newRating2 = Math.round(player2Rating + kFactor * ((1 - matchResult) - expectedScore2));

    return { newRating1, newRating2 };
}

