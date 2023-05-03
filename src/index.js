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
	socket.conneted_room = "";

	socket.on("connect to room", (room) => {
		socket.leave(socket.conneted_room);

		socket.conneted_room = room;
		socket.join(room);
	});

	socket.on("message", (message) => {
		const room = socket.conneted_room;

		io.to(room).emit("send message", {
			message,
			room,
		});
	});
});

httpServer.listen(3000, () => {
	console.log("server on");
});
