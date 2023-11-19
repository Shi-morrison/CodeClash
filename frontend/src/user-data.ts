import axios from 'axios';
import m from 'mithril';

export let userData = {
	ID: '',
	username: '...Loading',
	rank: '..Loading',
	profilePicFilename: '',
	wins: 0,
	losses: 0,
	gamesPlayed: 0,
	winLossRatio: 0,
	elo: '' as ('' | number)
};

export async function loadUserData() {
	axios.get('/api/current_user', {
		withCredentials: true // Important for including session cookies
	}).then(response => {
		const data = response.data;
		console.log("data" + data.user);
		const winLoss = data.user.wins / data.user.losses
		if (data.user) {
			userData = { ...data.user,
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
}

loadUserData();
