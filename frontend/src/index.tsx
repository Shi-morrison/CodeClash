import m from "mithril";
import { io } from "socket.io-client";

import Login from "./pages/Login";

function App() {
    const socket = io("http://localhost:3000");

    socket.emit("ping");
    return {
        view: () => (
            <div>
                <Login />
            </div>
        ),
    };

}

m.route(document.body, "/", {
    "/": App,
});