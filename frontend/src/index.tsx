import m from "mithril";
import { io } from "socket.io-client";
import Rankings from "./pages/Rankings";
import Front from "./pages/Front";
import Modal from "./pages/Profile"
import * as dotenv from 'dotenv';


const CLIENT_ID = "Iv1.96555551712a9807";

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

function Profile() {
    return {
        view: () => (
            <div>
                <Modal />
            </div>
        ),
    };
}

m.route.prefix = ""; 
m.route(document.body, "/", {
    "/": App,
    "/leaderboard": Leaderboard,
    "/profile": Profile,
});