import TrophyGold from "../components/TrophyGold";
import TrophySilver from "../components/TrophySilver";
import TrophyBronze from "../components/TrophyBronze";
import Navbar from "../components/Navbar";
import MobileBar from "../components/Mobilebar";

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

function RankingsBar() {
    return {
        view: () => (
            <div className="text-white flex justify-between bg-blue-500 bar glow">
                <div className="flex flex-row items-center relative">
                    <div className="md:md:text-[32px] ml-2">1.</div>
                    
                    <div className="flex items-center">
                        <div className="pl-4 md:text-[32px]">Name</div>
                    </div>
                </div>
                <div className="flex flex-row items-center bg-[#1a3522]">
                    <div className="px-4 md:px-8 md:text-[32px]">ELO</div>
                    <TrophyGold />
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
                    <RankingsBar />
                    <br></br>
                    <RankingsBar />
                </div>
            </div>
            
        )
    }
}

export default Rankings;