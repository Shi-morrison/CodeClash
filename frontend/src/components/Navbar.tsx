import BackArrow from "./BackArrow";
import axios from 'axios';
import m from 'mithril';
import FileUpload from '../components/FileUpload'
import { userData } from "../user-data";
import Profile from "../pages/Profile";

let modalClicked = false;
function Navbar() {
    return {
        view: (vnode: m.Vnode<{
            onback?: () => void;
        }>) => (
            <>
            
                <div className="invisible md:visible text-white flex justify-between px-16 navbar">
                    <div className="flex flex-row items-center">
                        <button onclick={() => {
                            if (vnode.attrs.onback)
                                vnode.attrs.onback();
                        }}>
                            <BackArrow />
                            <span style={{
                                lineHeight: "64px",
                                verticalAlign: "top",
                            }} className="text-[32px] inline-block">Back</span>
                        </button>
                    </div>
                    <div onclick={() => {
                                    console.log("clicked");
                                    modalClicked = true;
                                }} className="flex flex-row profileNavbar mb-2 mt-1">
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
export default Navbar;