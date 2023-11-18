import m from "mithril";
import { io } from "socket.io-client";
import Rankings from "./pages/Rankings";
import Front from "./pages/Front";
import axios from "axios";
import GameLayout from "./pages/GameInstance";
import Modal from "./pages/Profile";
import MobileModal from "./pages/MobileProfile";
import MainMenuPage from "./pages/MainMenuPage";
import * as dotenv from "dotenv";

const CLIENT_ID = "Iv1.96555551712a9807";

function App() {
  let currentRoom = "";
  let socket = io("http://localhost:3000");
  socket.on("get-room", (room: string) => {
    console.log("Current room: " + room);
    currentRoom = room;
  });
  socket.on("enter-match", (redirect: string) => {
    console.log("Redirecting to: " + redirect);
    window.location.href = "http://localhost:8080/" + redirect;
  });

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

function GamePage() {
  return {
    view: () => (
      <div>
        <GameLayout />
      </div>
    ),
  };
}

function TestingOutModalLooks() {
  return {
    view: () => <WinModal />,
  };
}

m.route.prefix = "";

function Profile() {
  return {
    view: () => (
      <div>
        <Modal />
      </div>
    ),
  };
}

function MobileProfile() {
  return {
    view: () => (
      <div>
        <MobileModal />
      </div>
    ),
  };
}

function MainMenu() {
  return {
    view: () => (
      <div>
        <MainMenuPage />
      </div>
    ),
  };
}

// Setup Axios interceptor
axios.interceptors.response.use(
  (response) => response, // On success, return the response
  (error) => {
    if (error.response && error.response.status === 401) {
      m.route.set("/login"); // Redirect to login page on 401 Unauthorized
    }
    return Promise.reject(error);
  }
);

m.route.prefix = "";

m.route(document.body, "/", {
  "/": App,
  "/leaderboard": Leaderboard,
  "/profile": Profile,
  "/mobileprof": MobileProfile,
  "/mainmenu": MainMenu,
  "/gameinstance": GamePage,
  "/test": TestingOutModalLooks,
});

export default App;
