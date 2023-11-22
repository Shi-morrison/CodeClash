import m from 'mithril';
import { userData } from "../user-data";


function ProfileInfo() {
    let profileInfo = "text-center py-4 px-4";

    return {
        view: (vnode: m.Vnode<{
            userData?: any;
            mobile?: boolean;
        }>) => {
            const udata = (vnode.attrs.userData ?? userData);
            return <div className="flex flex-row">
                <div className=" pl-2 flex flex-col flex-grow">
                    <div className={profileInfo}>Games Played</div>
                    <div className="text-center px-4">{udata.gamesPlayed}</div>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className={profileInfo}>Games Won</div>
                    <div className="text-center">{udata.wins}</div>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className={profileInfo}>Games Lost</div>
                    <div className="text-center">{udata.losses}</div>
                </div>
                {/* <div className="flex flex-col flex-grow">
                    <div className={profileInfo}>W/L</div>
                    <div className="text-center pr-[1px]">{udata.wins}</div>
                </div> */}
            </div>;
        }
    }
}

export default ProfileInfo;