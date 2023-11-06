import m from "mithril";
import { io } from "socket.io-client";

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

m.route(document.body, "/", {
    "/": App,
});