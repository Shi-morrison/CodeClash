import Flag from "../components/Flag";
import ProfileInfo from "../components/ProfileInfo";

function Profile() {
    return {
        view: () => (
            <>
                <div className="flex justify-center mt-24 glow">
                    <div className="text-white profile flex flex-row relative">
                        <div className="pt-12 pl-12 flex flex-col relative">
                            <img className="imgProfile rounded" src="https://tetr.io/res/avatar.png"/>
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                    <div className="pt-2 text-[36px]">Name</div>
                                        <Flag />
                                    </div>
                                    <div className= "text-[24px]">Elo/Rank</div>
                                    <div className="pt-6 lg:mt-6">
                                        <div>Achievements</div>
                                        <div className="achievements absolute w-[50vw]">
                                            Achievement
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-8 sm:ml-4 md:ml-8 profileInfo">
                            <ProfileInfo />
                        </div>
                        <div className="absolute top-2 right-2 cursor-pointer">X</div>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile;