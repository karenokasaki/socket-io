const socket = io("ws://localhost:8080");

const btnEnter = document.querySelector("#btn-enter");
const home = document.querySelector("#home");
const chatbox = document.querySelector("#chatbox");
const formName = document.querySelector("#nickname");
const rooms = document.querySelector("#rooms");

chatbox.style.display = "none";

let nickname = "";

btnEnter.onclick = (e) => {
  e.preventDefault();
  if (!formName.value) {
    alert("Por favor escreva seu nome");
    return;
  }
  chatbox.style.display = "block";
  nickname = formName.value;
  document.querySelector("#name").innerHTML = nickname;
  console.log(socket);
};

//quando receber uma mensagem
socket.on("message", (text) => {
  const el = document.createElement("li");
  el.innerHTML = text;
  document.querySelector("ul").appendChild(el);
});

//enviar uma mensagem
document.querySelector("#btn-send").onclick = (e) => {
  e.preventDefault();
  const text = document.querySelector("#input").value;
  socket.emit("message", text, nickname);
  document.querySelector("#input").value = "";
  console.log(socket);
};
