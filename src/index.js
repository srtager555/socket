const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "views/index.html");
});

io.on("connection", (socket) => {
	// basic emit

	socket.emit("welcome", "Now you are connected!");

	socket.on("server", (data) => {
		console.log(data);
	});

	// emit to everyone
	io.emit("everyone", socket.id + " has been connected");
});

httpServer.listen(3000, () => {
	console.log("server on");
});
