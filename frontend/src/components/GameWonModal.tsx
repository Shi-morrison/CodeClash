import m from "mithril"
import App from "./../index"

let showModal= true;

function routeToMain(){
    m.route(document.body, "/", {
        "/": App,
    });
}

function WinModal() {
    function closeModal() {
        showModal = false;
        m.redraw();
    }
    
    return {
        view: () => (
            showModal ? (
                <>
                <div class="modalContainer">
                    <div class="titleTextContainer p-3">

                            <h1 class="problemText text-[#d2ff1c]">Congratulations!</h1>
                            <h2 class ="problemText text-[#a3f0e8]">You won the game!</h2>
                            <img class= "checkmark" src="/checkmark.png"></img>
                    </div>

                    <div class = "closeButtonDiv p-3">
                        <button class="closeButton problemText text-purple-400" onclick={closeModal} >Close</button>
                    </div>
                    <div class="returnButtonDiv p-3">
                        <button class ="returnButton problemText" onclick={routeToMain}>Return to Match Making</button>
                    </div>
                </div>
                
            </>
            ) :null
            
        ),
    };
}

export default WinModal;
