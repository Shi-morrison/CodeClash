import axios from 'axios';
import m from 'mithril';

export let userData = {
	ID: '',
	username: '...Loading',
	rank: '..Loading',
	profilePicture: '',
	wins: 0,
	losses: 0,
	gamesPlayed: 0,
	elo: '' as ('' | number)
};

export const userDataPromise = (async () => {
	try {
		const response = await axios.get('/api/current_user', {
			withCredentials: true // Important for including session cookies
		});
		const data = response.data;
		console.log("data", data.user);
		const winLoss = data.user.wins / data.user.losses
		if (data.user) {
			userData = { ...data.user,
				ID: data.user._id,
			};

			m.redraw();
			return true;
			// Update state or context with user data
		} else {
			return false;
			// Handle not authenticated case
		}
	}
	catch (e) {
		return false;
	}
})();
