const socket = io();

function checkSocketStatus() {
	console.log("Socket state: ", socket.connected);
}

socket.on("connect", () => {
	console.log("The socket has been connected");
	checkSocketStatus();
});

socket.on("connect_error", () => {
	console.log("Socket can't connect");
	checkSocketStatus();
});

socket.on("disconnect", () => {
	console.log("The socket has been disconnected: ", socket.id);
	checkSocketStatus();
});

socket.io.on("reconnect", () => {
	console.log("The socket has been reconnected");
	checkSocketStatus();
});

socket.io.on("reconnect_attempt", () => {
	console.log("trying to connect");
});
