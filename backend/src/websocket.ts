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

  socket.emit("waiting", true);

  // When two clients are connected, create a room and redirect them to the game
  if (clients.length == 2) {
    const room = `room-${new Date().getTime()}`;
    clients[0].join(room);
    clients[1].join(room);

    // Redirect the clients to the game
    io.to(room).emit("enter-match", "leaderboard");

    // Send the room to the clients
    io.to(room).emit("get-room", room);

    // Remove the clients from the array
    clients = [];
  }

  // When a client essentially leaves the queue
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});
