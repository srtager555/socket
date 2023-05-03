const socket = io();

const connect_room_1 = document.querySelector("#connect-room-1");
const connect_room_2 = document.querySelector("#connect-room-2");
const connect_room_3 = document.querySelector("#connect-room-3");

connect_room_1.addEventListener("click", () => {
	socket.emit("connect to room", "room-1");
});

connect_room_2.addEventListener("click", () => {
	socket.emit("connect to room", "room-2");
});

connect_room_3.addEventListener("click", () => {
	socket.emit("connect to room", "room-3");
});

// messages

const send__message = document.querySelector("#send-message");

send__message.addEventListener("click", () => {
	const message = prompt("Write your message");

	socket.emit("message", message);
});

socket.on("send message", (data) => {
	const { room, message } = data;

	const li = document.createElement("li");
	li.textContent = message;

	document.querySelector(`#${room}`).append(li);
});
