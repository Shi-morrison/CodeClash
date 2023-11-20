import m from 'mithril';
import Navbar from "../components/Navbar";

const MainMenu: m.Component = () => {
    let isPlaying = false;

    const handlePlayClick = () => {
        isPlaying = true;
        m.redraw();
    };

    const handleisPlayingBack = () => {
        isPlaying = false;
        m.redraw();
    }

    // Transition for the buttons when play
    const applyTransition = (vnode: m.VnodeDOM) => {
        const buttonStyle = vnode.dom.style;
        if (isPlaying) {
            // Apply styles for moving off-screen and fading out
            buttonStyle.transition = 'transform 1.5s ease-in-out, opacity 0.5s ease-in-out';
            buttonStyle.transform = 'translateX(100vw)';
            buttonStyle.opacity = '0';
        } else {
            // Reset to initial styles
            buttonStyle.transform = 'translateX(0)';
            buttonStyle.opacity = '1';
        }
    };

    // Transition for the logo when play
    const applyLogoTransition = (vnode: m.VnodeDOM) => {
        const logoStyle = vnode.dom.style;
        if (isPlaying) {
            logoStyle.transition = 'transform 1.5s ease-in-out, opacity 0.5s ease-in-out';
            logoStyle.transform = 'translateX(-100vw)';
            logoStyle.opacity = '0';
        } else {
            logoStyle.transform = 'translateX(0)';
            logoStyle.opacity = '0';
        }
    };

    // Transition for the matchmaking modal when play
    const applyModalTransition = (vnode: m.VnodeDOM) => {
        const modalStyle = vnode.dom.style;
        if (isPlaying) {
            modalStyle.transition = 'opacity 1.5s ease-in-out';
            modalStyle.opacity = '1';
        } else {
            modalStyle.opacity = '0';
        }
    };

    return {
        view: () => (
            <div className="bg-black flex flex-col" style={{ height: "100vh", overflowX: "hidden"  }}>
                {/* Top Navbar */}
                <Navbar />
                <div className="w-full h-full flex justify-between items-top pt-8">
                    {/* Left side modal container */}
                    <div className="bg-red-500 py-2 p-4 mr-8 ml-8 items-center"
                        style={{ height: "10%" }}
                        oncreate={applyLogoTransition}
                        onupdate={applyLogoTransition}>
                        <div className="site-logo">Site Logo Placeholder</div>
                        <p>Play or click Options</p>
                    </div>
                    {/* Buttons column container */}
                    <div className="mr-8 mt-8 flex flex-col" style={{ width: "60vw", zIndex: 100 }}>
                        {/* Play button */}
                        <div style={{ textAlign: "right" }}>
                            <button
                                onclick={handlePlayClick}
                                oncreate={applyTransition}
                                onupdate={applyTransition}
                                className="items-center text-white bg-blue-500 bar glow hover:bg-blue-700 font-bold py-2 px-4 mb-4"
                                style={{ width: "90%", height: "100px" }}
                            >
                                <div className="flex text-[32px]" style={{ marginBottom: "5px" }}>Play</div>
                            </button>
                        </div>
                        {/* Options button */}
                        <div style={{ textAlign: "right" }}>
                            <button
                                oncreate={applyTransition}
                                onupdate={applyTransition}
                                className="text-white bg-blue-500 bar glow hover:bg-blue-700 font-bold py-2 px-4 mb-4"
                                style={{ marginTop: "1.5%", width: "87%", height: "100px" }}
                            >
                                <div className="flex text-[32px]" style={{ marginBottom: "5px" }}>Options</div>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Matchmaking Modal, appears when 'isPlaying' is true */}
                <div className="bg-black flex flex-col" style={{ height: "100vh" }}>
                    <div class={`modalContainer somethingelse ${isPlaying ? 'opacity-100' : 'opacity-0'} z-50`}
                        style={{
                            width: "65vw",
                            height: "65vh",
                            background: 'linear-gradient(to bottom, #b23a3a 0, #7a2828 100%)',
                            borderBottom: '2px solid #9b3232',
                            opacity: isPlaying ? '1' : '0',
                            transition: 'opacity 1.5s ease-in-out',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        oncreate={applyModalTransition}
                        onupdate={applyModalTransition}>
                        {/* Top Section of Modal */}
                        <div style={{ height: '60%', textAlign: 'center', paddingTop: '10px', marginLeft: '30px', marginRight: '30px' }}>
                            <div className="flex justify-center" style={{ color: 'white', marginBottom: '10px', fontSize: '64px'}}>MATCHMAKING</div>
                            <div className="flex text-[32px] justify-center" style={{ color: 'white' }}>Match with an opponent and race to solve a coding problem. The winner of this duel is resolved by speed, efficiency, and complexity.</div>
                        </div>
                        {/* Bottom Section of Modal */}
                        <div style={{ height: '20%', display: 'flex', justifyContent: 'center', paddingBottom: '1px' }}>
                            {/* START BUTTON */}
                            <button
                                style={{
                                    height: "100px",
                                    width: "25%",
                                    background: 'linear-gradient(to bottom, #b23a3a 0, #7a2828 100%)',
                                    border: '2px solid #9b3232',
                                    color: 'white',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}>
                                    <div className="flex text-[32px] justify-center">Start</div>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Bottom 'bar' */}
                <div className="text-white flex justify-between px-16 navbar" style={{ height: '10%' }}>
                    <div className="flex flex-row items-center">
                        <div>
                            <div className="text-[32px]">Welcome to CodeClash!</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default MainMenu;
