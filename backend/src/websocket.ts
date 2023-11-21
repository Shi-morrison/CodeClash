import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Verdict, getRandomProblem, judgeUserSubmission } from "./judge";

const io = new Server(3000, { cors: { origin: "*" } });

let clients: Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>[] = [];

io.on("connection", async (socket) => {
  console.log("A new user connected, total =", clients.length);
  clients.push(socket);

  socket.emit("waiting", true);

  // When two clients are connected, create a room and redirect them to the game
  if (clients.length == 2) {
    const room = `room-${new Date().getTime()}`;
    clients[0].join(room);
    clients[1].join(room);

    const problem = await getRandomProblem();

    // Redirect the clients to the game
    io.to(room).emit("start-game", {
      title: problem.title,
      difficulty: problem.difficulty,
      signature: problem.signature,
      problemStatement: problem.problemStatement,
      examples: problem.examples,
    });

    for (let i = 0; i < 2; ++i) {
      const j = i === 0 ? 1 : 0;
      const me = clients[i], opp = clients[j];

      me.on("update", (content: unknown) => {
        if (typeof content !== "string")
          return;
        opp.emit("opp-update", content);
      });

      me.on("submit", async (content: unknown) => {
        // console.log("content", content);
        if (typeof content !== "string")
          return;
        const verdict = await judgeUserSubmission(problem, content);
        // console.log("Verdict", Verdict[verdict]);
        if (verdict === Verdict.Accepted) {
          me.emit("game-over", true);
          opp.emit("game-over", false);
        }
        else {
          me.emit("verdict", verdict);
        }
      });
    }

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
