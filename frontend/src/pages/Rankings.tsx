import TrophyGold from "../components/TrophyGold";
import TrophySilver from "../components/TrophySilver";
import TrophyBronze from "../components/TrophyBronze";
import Navbar from "../components/Navbar";
import MobileBar from "../components/Mobilebar";
import axios from "axios";
import m from "mithril";
import oninit from "mithril";
import Profile from "./Profile";

let modalClicked = false;

let users: {
  _id: string;
  username: string;
  elo: string | number;
}[] = [];
const testPlayer1Id = "654e9aa5c03ea389edcf2aeb"; // Replace with actual test player 1 ID
const testPlayer2Id = "6556b3b607abc3a2596bbebd"; // Replace with actual test player 2 ID

function RankingsTitle() {
  return {
    view: () => (
      <div className="flex justify-center md:mt-24">
        <div class="wrapper">
          <div class="header-wrap text-6xl text-[#6ec3c1]">
            <h1>Leaderboard</h1>
          </div>
        </div>
      </div>
    ),
  };
}

function RankingsBar() {
  return {
    oninit: () => {
      // Fetch leaderboard data when the component is initialized
      axios
        .get("/api/leaderboard", { withCredentials: true })
        .then((response) => {
          users = response.data;
          m.redraw(); // Redraw the view once data is received
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    view: () => (
      <div className="flex flex-col">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="text-white flex justify-between bg-blue-500 bar glow">
            <div className="flex flex-row items-center relative">
              <div className="md:text-[32px] ml-2">{index + 1}.</div>
              <div className="flex items-center">
                <div className="pl-4 md:text-[32px]">{user.username}</div>
              </div>
            </div>
            <div className="flex flex-row items-center bg-[#1a3522]">
              <div className="px-4 md:px-8 md:text-[32px]">{user.elo}</div>
              {/* Add trophy logic based on user.rank */}
            </div>
          </div>
        ))}
      </div>
    ),
  };
}

function Rankings() {
  const handleWin = (winnerId: string, loserId: string) => {
    axios
      .post(
        "/api/matchComplete",
        {
          winnerId,
          loserId,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Elo updated", response.data);
        // Optionally, refresh the leaderboard data
        m.redraw();
      })
      .catch((error) => {
        console.error("Error updating Elo:", error);
      });
  };

  return {
    view: () => (
      <div>
        {/* Conditionally render the modal */}
        <div class="centerChris">
          {modalClicked ? (
            <Profile
              onclose={() => {
                modalClicked = false;
              }}
            />
          ) : undefined}
        </div>

        <div className="block md:hidden">
          <MobileBar />
        </div>
        <Navbar />
        <RankingsTitle />
        <div className="flex flex-col">
          <RankingsBar />
        </div>
        <div className="px-6">
          <div className="flex flex-col md:flex-row justify-center md:space-x-4">
            <div className="wrapper mb-4 md:mb-0">
              <div
                role="button"
                className="retro-btn"
                onclick={() => {
                  handleWin(testPlayer1Id, testPlayer2Id);
                  modalClicked = true;
                }}>
                <span className="btn-inner">
                  <span className="content-wrapper">
                    <span className="btn-content">
                      <span className="btn-content-inner bg-red-500">Joe</span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="flex flex-col md:flex-row justify-center md:space-x-4">
            <div className="wrapper mb-4 md:mb-0">
              <div
                role="button"
                className="retro-btn"
                onclick={() => {
                  handleWin(testPlayer2Id, testPlayer1Id);
                  modalClicked = true;
                }}>
                <span className="btn-inner">
                  <span className="content-wrapper">
                    <span className="btn-content">
                      <span className="btn-content-inner bg-red-500">Mama</span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };
}

export default Rankings;
