

function RankingsTitle() {
    return {
        view: () => (
            <div className="flex justify-center mt-24">
                <div class="wrapper">
                    <div class="header-wrap text-6xl text-[#6ec3c1]">
                        <h1>Leaderboard</h1>
                    </div>
                </div>
            </div>
        )
    }
}

function RankingsHeaders() {
    return {
        view: () => (
            <div className="hidden md:flex flex-row justify-center">
                <div className="flex flex-row">
                    <div className="text-[#6ec3c1]">Games Played</div>
                    <div className="text-[#6ec3c1]">Games Won</div>
                    <div className="text-[#6ec3c1]">Games Lost</div>
                </div>
            </div>
        )
    }
}

function RankingsBar() {
    return {
        view: () => (
            <div className="flex justify-between bg-blue-500 bar">
                <div className="text-[#6ec3c1] flex flex-row relative">
                    <div className="md:md:text-[32px]">Rank</div>
                    <div>
                        <div className="text-[#6ec3c1] pl-4 md:text-[32px]">Name</div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="text-[#6ec3c1] px-4 md:px-8 md:text-[32px]">ELO</div>
                </div>
            </div>
        )
    }
}




function Rankings() {
    return {
        view: () => (
            <div>
                <RankingsTitle />
                <RankingsBar />
            </div>
            
        )
    }
}

export default Rankings;