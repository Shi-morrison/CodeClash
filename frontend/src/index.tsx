import m from "mithril";
import Rankings from "./pages/Rankings";
import Front from "./pages/Front";
import axios from "axios";
import GameLayout from "./pages/GameInstance";
import Modal from "./pages/Profile";
import MobileModal from "./pages/MobileProfile";
import MainMenuPage from "./pages/MainMenuPage";
import * as dotenv from "dotenv";
import { userData, userDataPromise } from "./user-data";

const CLIENT_ID = "Iv1.96555551712a9807";

function App() {
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
    oncreate: async () => {
      if (!await userDataPromise) m.route.set("/");
    },
    view: () => (
      <div>
        <Rankings />
      </div>
    ),
  };
}

function GamePage() {
  return {
    oncreate: async () => {
      if (!await userDataPromise) m.route.set("/");
    },
    view: () => (
      <div>
        <GameLayout />
      </div>
    ),
  };
}

function Profile() {
  return {
    oncreate: async () => {
      if (!await userDataPromise) m.route.set("/");
    },
    view: () => (
      <div>
        <Modal />
      </div>
    ),
  };
}

function MobileProfile() {
  return {
    oncreate: async () => {
      if (!await userDataPromise) m.route.set("/");
    },
    view: () => (
      <div>
        <MobileModal />
      </div>
    ),
  };
}

function MainMenu() {
  return {
    oncreate: async () => {
      if (!await userDataPromise) m.route.set("/");
    },
    view: () => (
      <div>
        <MainMenuPage />
      </div>
    ),
  };
}

m.route.prefix = "";

m.route(document.body, "/", {
  "/": App,
  "/leaderboard": Leaderboard,
  "/profile": Profile,
  "/mobileprof": MobileProfile,
  "/mainmenu": MainMenu,
  "/gameinstance": GamePage,
});

export default App;
