const user = prompt("Write your user");
const teachers = ["Juan", "Marcos", "David"];

let socket_namespace, group;

const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");

if (teachers.includes(user)) {
	socket_namespace = io("/teachers");
	group = "teachers";
} else {
	socket_namespace = io("/students");
	group = "students";
}

socket_namespace.on("connect", () => {
	console.log(namespace);
	namespace.textContent = group;
});

// send message logic

const send_message = document.querySelector("#send-message");

send_message.addEventListener("click", () => {
	const message = prompt("Write your message");

	socket_namespace.emit("send message", { message, user });
});

socket_namespace.on("message", (data) => {
	const { user, message } = data;

	const li = document.createElement("li");
	li.textContent = `${user}: ${message}`;

	chat.append(li);
});
