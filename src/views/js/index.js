const socket = io();

socket.on("welcome", (data) => {
	const text = document.querySelector("#text");

	text.textContent = data;
});

socket.on("everyone", (message) => {
	console.log(message);
});

socket.on("salute", (message) => {
	console.log(message);
});

const emitToServer = document.querySelector("#emit-to-server");

emitToServer.addEventListener("click", () => {
	socket.emit("server", "Hello server! <3");
});

const emitToLast = document.querySelector("#emit-to-last");

emitToLast.addEventListener("click", () => {
	socket.emit("last", "Hi!");
});

socket.on("on", "This can be repeat");

socket.once("on", "This only can run a time");

const listener = () => {
	console.log("This shut down the event");
};

socket.off("off", listener);

setTimeout(() => {
	socket.off("off", listener);
}, 2000);
