import BackArrow from "./BackArrow";

function MobileBar(show = true) {
    return {
        view: () => (
            <div className="text-white flex flex-row justify-between mx-4">
                <div>
                    <BackArrow />
                </div>
                <div>
                    <div className="flex flex-row profileNavbar mb-2 mt-2">
                        <div className="flex flex-col profileNavbar">
                            <div className="flex justify-center">
                                <div>Profile</div>  
                            </div>
                            <div className="rank">Rank</div>
                        </div>
                        <div className="flex items-center">
                            <img className="img rounded" src="https://tetr.io/res/avatar.png"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MobileBar;