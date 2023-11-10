import FlagMobile from "../components/FlagMobile";

function MobileProfile() {
    return {
        view: () => (
            <>
                <div className="flex justify-center mt-36 ">

                    <div className="text-white mobileProfile glow">
                        <div className="flex flex-row justify-center">
                            <div className="flex justify-center mt-2">
                                    Name
                            </div>
                            <div><FlagMobile /></div>
                        </div>
                        <div className="flex justify-center">
                            ELO
                        </div>
                        <div className="flex justify-center">
                            <div className="mobileProfileInfo">
                                <div className="flex flex-row ml-2">
                                    <div className="flex flex-col">
                                        <div>Games Played</div>
                                        <div>Number</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>Games Won</div>
                                        <div>Number</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>Games Lost</div>
                                        <div>Number</div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-12">
                                    <div>Rank</div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="flex justify-center">
                            <div className="mobileAchievements">
                                <div className="flex justify-center">
                                    <div>Achievements</div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>Hello</div>
                                        <div>Hello</div>
                                        <div>Hello</div>
                                        <div>Hello</div>
                                        <div>Hello</div>
                                        <div>Hello</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MobileProfile;