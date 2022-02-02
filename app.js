require("dotenv").config();
const express = require("express");
const dbConnect = require("./database");

const app = express();

app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
	res.status(400).json({
		status: "success",
		message: "Welcome to the node.js task",
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
