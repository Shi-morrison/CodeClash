import express from "express";
import userRoutes from './api/routes/userRoutes';	// import the userRoutes module
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// dotenv.config() loads environment variables from a .env file into process.env
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'missing';

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

// This is a randomly chosen port. The API server will listen on localhost:44252 .
const PORT = 44252;

const app = express();

// Enable URL-encoded body parsing for POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tiny example of one API endpoint
app.post("/api/test", async (req, res) => {
	if (typeof req.body !== "object") {
		res.status(400);
		res.json({ "success": false, "message": "request body should be an object" });
		return;
	}

	// we know req.body is an object now, so get all the fields we need...
	const username: unknown = req.body["username"];

	// ...and check that they're the right type
	if (typeof username !== "string") {
		res.status(400);
		res.json({ "success": false, "message": "'username' should be a string" });
		return;
	}

	// now we can respond however we want
	res.json({
		"success": true,
		"message": `Request username was ${username}`,
	});
});

// Enable '/users' endpoint and its methods (oAuth and saveUser).
app.use('/users', userRoutes);

app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`);
});
