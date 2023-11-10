import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const io = new Server(3000, { cors: { origin: "*" } });

let clients: Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>[] = [];

io.on("connection", (socket) => {
  console.log("A new user connected");
  clients.push(socket);

  if (clients.length == 2) {
    const room = `room-${new Date().getTime()}`;
    clients[0].join(room);
    clients[1].join(room);

    io.to(room).emit("start-game", console.log("Game started"));

    // Remove the clients from the array
    clients = [];
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});
