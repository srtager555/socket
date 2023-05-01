const socket = io();

socket.on("welcome", (data) => {
	const text = document.querySelector("#text");

	text.textContent = data;
});

socket.on("everyone", (message) => {
	console.log(message);
});

const emitToServer = document.querySelector("#emit-to-server");

emitToServer.addEventListener("click", () => {
	socket.emit("server", "Hello server! <3");
});
