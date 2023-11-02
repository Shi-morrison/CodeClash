import m from "mithril";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");

  socket.emit("ping");

  return {
    view: () => (
      <div>
        <h1>Hello world</h1>
      </div>
    ),
  };
}

m.route(document.body, "/", {
  "/": App,
});
