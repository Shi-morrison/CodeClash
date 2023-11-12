import axios from 'axios';
import m from 'mithril';


function ProfileInfo() {
    let profileInfo = "py-4 px-[1px] md:px-4 lg:px-4";

    let userData = {
        username: '...Loading',
        rank: '..Loading',
        profilePicFilename: '',
        wins: 0,
        losses: 0,
        gamesPlayed: 0,
        winLossRatio: 0

    };

    axios.get('http://localhost:44251/api/current_user', {
        withCredentials: true // Important for including session cookies
    })
        .then(response => {
            const data = response.data;
            console.log("data" + data.user);
            const winLoss = data.user.wins / data.user.losses
            if (data.user) {
                userData = {
                    username: data.user.username,
                    rank: data.user.rank,
                    profilePicFilename: data.user.profilePicture,
                    wins: data.user.wins,
                    losses: data.user.losses,
                    gamesPlayed: data.user.gamesPlayed,
                    winLossRatio: winLoss
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
            <div className="flex flex-row w-[30vw]">
                <div className=" pl-2 flex flex-col">
                    <div className={profileInfo}>Games Played</div>
                    <div className="px-[1px] md:px-4 lg:px-4">{userData.gamesPlayed}</div>
                </div>
                <div className="flex flex-col">
                    <div className={profileInfo}>Games Won</div>
                    <div>{userData.wins}</div>
                </div>
                <div className="flex flex-col">
                    <div className={profileInfo}>Games Lost</div>
                    <div>{userData.losses}</div>
                </div>
                <div className="flex flex-col">
                    <div className={profileInfo}>W/L</div>
                    <div className="pr-[1px]">{userData.wins}</div>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;