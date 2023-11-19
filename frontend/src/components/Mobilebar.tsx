import BackArrow from "./BackArrow";
import axios from 'axios';
import m from 'mithril';
import { userData } from "../user-data";

function MobileBar() {
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
                                <div>{userData.username}</div>
                            </div>
                            <div className="rank">{userData.rank}</div>
                        </div>
                        <div className="flex items-center">
                            <img className="img rounded" src={userData.profilePicture} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MobileBar;