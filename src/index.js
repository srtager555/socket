const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

// middleware
io.use((socket, next) => {
	const token = socket.handshake.auth.token;

	if (token != "token") {
		const err = new Error("You can't be authenticated");
		err.data = {
			detail: "your token is not valid",
		};

		next(err);
	} else {
		next();
	}
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "views/index.html");
});

io.on("connection", (socket) => {});

httpServer.listen(3000, () => {
	console.log("server on");
});
