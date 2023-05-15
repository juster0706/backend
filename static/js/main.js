const socket = io();

socket.on("connect", () => {
  let name = prompt("닉네임을 적어주세요", "");
  if (!name) {
    name = "익명";
  }
  socket.emit("newUser", name);
});
socket.on("update", (data) => {
  console.log(data);
  console.log(`${data.name}:${data.message}`);
});

function send() {
  let message = document.getElementById("test").value;
  document.getElementById("test").value = "";
  socket.emit("message", { type: "message", message: message });
}
