import m from "mithril";
import { io } from "socket.io-client";
import Rankings from "./pages/Rankings";
import Front from "./pages/Front";

function App() {
    const socket = io("http://localhost:3000");

    socket.emit("ping");
    return {
        view: () => (
            <div>
                <Front />
            </div>
        ),
    };
}

function Leaderboard() {
    return {
        view: () => (
            <div>
                <Rankings />
            </div>
        ),
    };
}

m.route.prefix = ""; 
m.route(document.body, "/", {
    "/": App,
    "/leaderboard": Leaderboard,
});