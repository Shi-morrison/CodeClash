import TrophyGold from "../components/TrophyGold";
import TrophySilver from "../components/TrophySilver";
import TrophyBronze from "../components/TrophyBronze";
import Navbar from "../components/Navbar";
import MobileBar from "../components/Mobilebar";
import axios from "axios";
import m from 'mithril';

// Define a TypeScript interface for the user object
interface User {
    _id: string;
    username: string;
    elo: number;
    rank: 'bronze' | 'silver' | 'gold';
}

let users: User[] = [];

// Function to fetch leaderboard data
const fetchLeaderboard = async () => {
    try {
        const response = await axios.get('http://localhost:44251/api/leaderboard', {
            withCredentials: true // Important for including session cookies
        });
        users = response.data;
        m.redraw(); // Trigger Mithril to update the view
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
};

// Fetch leaderboard data on component initialization
fetchLeaderboard();

function RankingsTitle() {
    return {
        view: () => (
            <div className="flex justify-center md:mt-24">
                <div class="wrapper">
                    <div class="header-wrap text-6xl text-[#6ec3c1]">
                        <h1>Leaderboard</h1>
                    </div>
                </div>
            </div>
        )
    }
}

function RankingsBar({ user }: { user: User }) {

    console.log("DSADS:" + user)
    const getTrophy = (rank: User['rank']) => {
        switch (rank) {
            case 'gold':
                return <TrophyGold />;
            case 'silver':
                return <TrophySilver />;
            case 'bronze':
                return <TrophyBronze />;
            default:
                return null;
        }
    };

    return {
        view: () => (
            <div className="text-white flex justify-between bg-blue-500 bar glow">
                <div className="flex flex-row items-center relative">
                    {/* Display username */}
                    <div className="flex items-center">
                        <div className="pl-4 md:text-[32px]">{user.username}</div>
                    </div>
                </div>
                <div className="flex flex-row items-center bg-[#1a3522]">
                    {/* Display ELO */}
                    <div className="px-4 md:px-8 md:text-[32px]">{user.elo}</div>
                    {/* Display trophy based on rank */}
                    {getTrophy(user.rank)}
                </div>
            </div>
        )
    }
}

function Rankings() {
    return {
        view: () => (
            <div>
                <div className="block md:hidden">
                    <MobileBar />
                </div>
                <Navbar />
                <RankingsTitle />
                <div className="flex flex-col">
                    {users.map((user) => (
                        console.log("DSADS:" + user.username),
                        < RankingsBar key={user._id} user={user} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Rankings;
