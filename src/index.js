const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

const socketsOnline = [];

app.get("/", (req, res) => {
	res.sendFile(__dirname + "views/index.html");
});

io.on("connection", (socket) => {
	socketsOnline.push(socket.id);

	// basic emit
	socket.emit("welcome", "Now you are connected!");

	socket.on("server", (data) => {
		console.log(data);
	});

	// emit to everyone
	io.emit("everyone", socket.id + " has been connected");

	// emit a only socket
	socket.on("last", (message) => {
		const lastSocket = socketsOnline[socketsOnline.length - 1];

		io.to(lastSocket).emit("salute", message);
	});

	// on, once, off
	socket.emit("on", "hi!");

	socket.emit("once", "hi!");

	socket.emit("off", "hi!");
	setTimeout(() => {
		socket.emit("off", "hi!");
	}, 3000);
});

httpServer.listen(3000, () => {
	console.log("server on");
});
