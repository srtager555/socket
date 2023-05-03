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

// io.on("connection", (socket) => {

// })

const teachers = io.of("teachers");
const students = io.of("students");

teachers.on("connection", (socket) => {
	console.log(socket.id, "teacher");

	socket.on("send message", (data) => {
		teachers.emit("message", data);
	});
});

students.on("connection", (socket) => {
	console.log(socket.id, "student");

	socket.on("send message", (data) => {
		students.emit("message", data);
	});
});

httpServer.listen(3000, () => {
	console.log("server on");
});
