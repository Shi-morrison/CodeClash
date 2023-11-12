import express from "express";
import userRoutes from './api/routes/userRoutes';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import * as dotenv from 'dotenv';
import GitHubStrategy from 'passport-github'
import User from './db/models/userModel';
import cors from 'cors'


// dotenv.config() loads environment variables from a .env file into process.env
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'missing';
const GITHUB_CLIENT_ID = process.env.CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET || '';

// Authorization with github
passport.use(new GitHubStrategy({
	clientID: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:44251/auth/github/callback"
},
	async (accessToken, refreshToken, profile, done) => {
		try {
			// Use first email in email array
			let email = '';
			if (profile.emails && profile.emails.length > 0) {
				email = profile.emails[0].value;
			}

			// Login user by githubId, else create new user
			let user = await User.findOne({ githubId: profile.id });
			if (!user) {
				user = new User({
					githubId: profile.id,
					username: profile.username,
					email: email,
					wins: 0,
					losses: 0,
					gamesPlayed: 0,
					elo: 0
				});
				console.log("user:" + user)
				await user.save();
			}
			return done(null, user);
		} catch (error: any) {
			return done(error);
		}
	}
));

// Serialize user into data base
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (githubId, done) => {
	try {
		const user = await User.findById(githubId);
		done(null, user);
	} catch (error) {
		done(error);
	}
});


// Connect to the database
async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI, {

		});
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Database connection failed:', error);
	}
}
connectDB();

// This is a randomly chosen port. The API server will listen on localhost:44251 .
const PORT = 44251;
const app = express();

// Cors policy access
const corsOptions = {
	origin: 'http://localhost:8080',
	credentials: true,
}
app.use(cors(corsOptions));


// Enable URL-encoded body parsing for POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create passport session , with session secret and mongoDb session data
app.use(session({
	secret: '1234',
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: MONGO_URI }),
	cookie: { secure: 'auto' }
}));
app.use(passport.initialize());
app.use(passport.session());

// Paths for Oauth web flow
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect('http://localhost:8080/leaderboard'); // Redirect to the home page
	}
);

// Enable '/api' endpoint and its methods.
app.use('/api', userRoutes);



app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`);
});
