import BackArrow from "./BackArrow";
import axios from 'axios';
import m from 'mithril';
import FileUpload from '../components/FileUpload'
import { userData } from "../user-data";

function Navbar() {
    return {
        view: () => (
            <div className="invisible md:visible text-white flex justify-between px-16 navbar">
                <div className="flex flex-row items-center">
                    <div className="cursor-pointer">
                        <BackArrow />
                    </div>
                    <div className="text-[32px]">Back</div>
                </div>
                <div className="flex flex-row profileNavbar mb-2 mt-1">
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
        )
    }
}
export default Navbar;