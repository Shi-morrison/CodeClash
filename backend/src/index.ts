import express from "express";

// This is a randomly chosen port. The API server will listen on localhost:44252 .
const PORT = 44252;

const app = express();

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

app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`);
});
