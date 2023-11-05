import m from "mithril";
import { io } from "socket.io-client";

import Login from "./pages/Login";

import * as dotenv from 'dotenv';


const CLIENT_ID = "Iv1.96555551712a9807";

function App() {
    const socket = io("http://localhost:3000");

    socket.emit("ping");
    return {
        view: () => (
            <div>
                <Login />
                <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`}>GITHUB LINK</a>
            </div>
        ),
    };

}

m.route(document.body, "/", {
    "/": App,
});