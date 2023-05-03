const socket = io({
	auth: {
		token: "toke",
	},
});

// connection error

socket.on("connect_error", (err) => {
	console.log("connection error");
	console.log(err.message);
	console.log(err.data.detail);
});
