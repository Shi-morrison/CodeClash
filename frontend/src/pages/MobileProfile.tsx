import FlagMobile from "../components/FlagMobile";
import axios from 'axios';
import m from 'mithril';
import { userData } from "../user-data";
function MobileProfile() {
    return {
        view: () => (
            <>
                <div className="flex justify-center mt-36 ">

                    <div className="text-white mobileProfile glow">
                        <div className="flex flex-row justify-center">
                            <div className="flex justify-center mt-2">
                                {userData.username}
                            </div>
                            <div><FlagMobile /></div>
                        </div>
                        <div className="flex justify-center">
                            {userData.elo}
                        </div>
                        <div className="flex justify-center">
                            <div className="mobileProfileInfo">
                                <div className="flex flex-row ml-2">
                                    <div className="flex flex-col">
                                        <div>Games Played</div>
                                        <div>{userData.gamesPlayed}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>Games Won</div>
                                        <div>{userData.wins}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>Games Lost</div>
                                        <div>{userData.losses}</div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-12">
                                    <div>{userData.rank}</div>
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