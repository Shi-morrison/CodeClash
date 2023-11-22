import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Verdict, getRandomProblem, judgeUserSubmission } from "./judge";
import { getRandomValues } from "crypto";
import { updateRatings } from "./api/rating";

const tokenMap = new Map<string, string>();
export function getTempToken(id: string): string {
  const buf = Buffer.alloc(16);
  getRandomValues(buf);
  const token = buf.toString("hex");
  tokenMap.set(token, id);
  return token;
}

const io = new Server(3000, { cors: { origin: "*" } });

let clients: { socket: Socket; id: string; }[] = [];

io.on("connection", (socket) => {
  console.log("A new user connected...");
  socket.once("authenticate", async (token) => {
    const id = tokenMap.get(token);
    if (typeof token !== "string" || id === undefined)
      return;
    console.log("...", id, "received! total =", clients.length);
    const clientData = { socket, id };
    clients.push(clientData);
  
    // When two clients are connected, create a room and redirect them to the game
    if (clients.length == 2) {
      const room = `room-${new Date().getTime()}`;
      clients[0].socket.join(room);
      clients[1].socket.join(room);
  
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
  
        me.socket.on("update", (content: unknown) => {
          if (typeof content !== "string")
            return;
          opp.socket.emit("opp-update", content);
        });
  
        me.socket.on("submit", async (content: unknown) => {
          // console.log("content", content);
          if (typeof content !== "string")
            return;
          const verdict = await judgeUserSubmission(problem, content);
          // console.log("Verdict", Verdict[verdict]);
          if (verdict === Verdict.Accepted) {
            const res = await updateRatings({
              winnerId: me.id,
              loserId: opp.id,
            });

            me.socket.emit("game-over", {
              didIWin: true,
              newRating: res.winner,
            });
            opp.socket.emit("game-over", {
              didIWin: false,
              newRating: res.loser,
            });
          }
          else {
            me.socket.emit("verdict", verdict);
          }
        });
      }
  
      // Remove the clients from the array
      clients = [];
    }
  
    // When a client essentially leaves the queue
    socket.on("disconnect", () => {
      console.log("A user disconnected");
      const index = clients.indexOf(clientData);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
  });
});
