import m from "mithril"
import App from "./../index"
import { disconnect } from "../game-logic";

function WinModal() {
    return {
        view: (vnode: m.Vnode<{
            onclose?: () => void;
            winOrLose: "win" | "lose";
        }>) => (
            <div class="modalContainer">
                <div class="titleTextContainer p-3">

                        <h1 class="problemText" style={{
                            color: vnode.attrs.winOrLose === "win"
                                ? "#d2ff1c"
                                : "#f33",
                        }}>{vnode.attrs.winOrLose === "win"
                            ? "Congratulations!"
                            : "You lost!"}</h1>
                        <h2 class ="problemText text-[#a3f0e8]">{vnode.attrs.winOrLose === "win"
                            ? "You won the game!"
                            : "Better luck next time!"}</h2>
                        {vnode.attrs.winOrLose === "win"
                            ? <img class= "checkmark" src="/checkmark.png" />
                            : undefined}
                </div>

                <button class="closeButton p-3 problemText text-purple-400" onclick={() => {
                    if (vnode.attrs.onclose)
                        vnode.attrs.onclose();
                }}>Close</button>
                <button class ="returnButton p-3 problemText" onclick={() => {
                    disconnect();
                    m.route.set("/mainmenu");
                }}>Return to Main Menu</button>
            </div>
        ),
    };
}

export default WinModal;
