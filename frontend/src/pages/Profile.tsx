import Flag from "../components/Flag";
import ProfileInfo from "../components/ProfileInfo";
import axios from 'axios';
import m from 'mithril';

function Profile() {

    let userData = {
        username: '...Loading',
        rank: '..Loading',
        profilePicFilename: '',
        ID: '',
        elo: ''
    };

    axios.get('http://localhost:44251/api/current_user', {
        withCredentials: true // Important for including session cookies
    })
        .then(response => {
            const data = response.data;
            console.log("data" + data.user);
            if (data.user) {
                userData = {
                    username: data.user.username,
                    rank: data.user.rank,
                    profilePicFilename: data.user.profilePicture,
                    ID: data.user._id,
                    elo: data.user.elo
                };

                m.redraw();
                // Update state or context with user data
            } else {
                console.error('User not authenticated');
                // Handle not authenticated case
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return {
        view: () => (
            <>
                <div className="flex justify-center mt-24 glow">
                    <div className="text-white profile flex flex-row relative">
                        <div className="pt-12 pl-12 flex flex-col relative">
                            <img className="imgProfile rounded" src={userData.profilePicFilename} />
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <div className="pt-2 text-[36px]">{userData.username}</div>
                                        <Flag />
                                    </div>
                                    <div className="text-[24px]">{userData.elo}/{userData.rank}</div>
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