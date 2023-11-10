import BackArrow from "./BackArrow";
import axios from 'axios';
import m from 'mithril';



function Navbar() {

    let userData = {
        username: '...Loading',
        rank: '..Loading'
    };

    axios.get('http://localhost:44251/api/current_user', {
        withCredentials: true // Important for including session cookies
    })
        .then(response => {
            const data = response.data;
            if (data.user) {
                userData = {
                    username: data.user.username,
                    rank: data.user.rank
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
            <div className="invisible md:visible text-white flex justify-between px-16 navbar">
                <div className="flex flex-row items-center">
                    <div className="cursor-pointer">
                        <BackArrow />
                    </div>
                    <div className="text-[32px]">Leaderboard</div>
                </div>
                <div className="flex flex-row profile mb-2 mt-1">
                    <div className="flex flex-col profile">
                        <div>{userData.username}</div>
                        <div className="rank">{userData.rank}</div>
                    </div>
                    <div className="flex items-center">
                        <img className="img rounded" src="https://tetr.io/res/avatar.png" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;