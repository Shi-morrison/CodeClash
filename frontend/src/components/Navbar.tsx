import BackArrow from "./BackArrow";

function Navbar(){
    return {
        view: () => (
            <div className="invisible md:visible text-white flex justify-between px-16 navbar">
                <div className="flex flex-row items-center">
                    <div className="cursor-pointer">
                        <BackArrow/>
                    </div>
                    <div className="text-[32px]">Leaderboard</div>
                </div>
                <div className="flex flex-row profile mb-2 mt-1">
                    <div className="flex flex-col profile">
                        <div>Profile</div>
                        <div className="rank">Rank</div>
                    </div>
                    <div className="flex items-center">
                        <img className="img rounded" src="https://tetr.io/res/avatar.png"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;