import BackArrow from "./BackArrow";
import axios from 'axios';
import m from 'mithril';
import { userData } from "../user-data";
import Profile from "../pages/Profile";

function MobileBar() {
    let modalClicked = false;

    return {
        view: (vnode: m.Vnode<{
            onback?: () => void;
        }>) => (
            <>
                <div className="text-white flex flex-row justify-between mx-4">
                    <button onclick={() => {
                        if (vnode.attrs.onback)
                            vnode.attrs.onback();
                    }}>
                        <BackArrow />
                    </button>
                    <div>
                        <div onclick={() => {
                                    console.log("clicked");
                                    modalClicked = true;
                                }} className="flex flex-row profileNavbar mb-2 mt-2">
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

                {/* Conditionally render the modal */}
                <div class="centerChris" style={{ zIndex: "500" }}>
                    {modalClicked ? (
                        <Profile onclose={() => {
                            modalClicked = false;
                        }} />
                    ) : undefined}
                </div>
            </>
        )
    }
}

export default MobileBar;