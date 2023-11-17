import m from "mithril"
import App from "./../index"

function WinModal() {
    return {
        view: (vnode: m.Vnode<{
            onclose?: () => void;
        }>) => (
            <div class="modalContainer">
                <div class="titleTextContainer p-3">

                        <h1 class="problemText text-[#d2ff1c]">Congratulations!</h1>
                        <h2 class ="problemText text-[#a3f0e8]">You won the game!</h2>
                        <img class= "checkmark" src="/checkmark.png"></img>
                </div>

                <button class="closeButton p-3 problemText text-purple-400" onclick={() => {
                    if (vnode.attrs.onclose)
                        vnode.attrs.onclose();
                }}>Close</button>
                <button class ="returnButton p-3 problemText" onclick={() => {
                    m.route(document.body, "/", {
                        "/": App,
                    });
                }}>Return to Match Making</button>
            </div>
        ),
    };
}

export default WinModal;
