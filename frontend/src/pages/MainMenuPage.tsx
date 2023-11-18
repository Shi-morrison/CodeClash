import m from 'mithril';
import Navbar from "../components/Navbar";

const MainMenu: m.Component = () => {
    let isPlaying = false;

    const handlePlayClick = () => {
        isPlaying = true;
        m.redraw(); // Trigger a redraw
    };

    const handleisPlayingBack = () => {
        isPlaying = false;
        m.redraw();
    }

    // Apply transition styles directly to the button element
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

    // Apply transition styles to the site-logo container
    const applyLogoTransition = (vnode: m.VnodeDOM) => {
        const logoStyle = vnode.dom.style;
        if (isPlaying) {
            logoStyle.transition = 'transform 1.5s ease-in-out, opacity 0.5s ease-in-out';
            logoStyle.transform = 'translateX(-100vw)'; // Move off-screen to the left
            logoStyle.opacity = '0';
        } else {
            logoStyle.transform = 'translateX(0)';
            logoStyle.opacity = '1';
        }
    };

    // Function to apply transition to the matchmakeModal
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
            <div className="bg-black flex flex-col" style={{ height: "100vh" }}>
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
                    <div className="mr-8 mt-8 flex flex-col" style={{ width: "60vw", zIndex: 100}}>
                        {/* Play button */}
                        <div style={{ textAlign: "right" }}>
                        <button
                            onclick={handlePlayClick}
                            oncreate={applyTransition}
                            onupdate={applyTransition}
                            className="items-center text-white bg-blue-500 bar glow hover:bg-blue-700 font-bold py-2 px-4 mb-4"
                            style={{ width: "90%", height: "100px" }}
                        >
                            <div className="flex text-[32px]" style={{marginBottom: "5px"}}>Play</div>
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
                            <div className="flex text-[32px]" style={{marginBottom: "5px"}}>Options</div>
                        </button>
                    </div>
                    </div>
                </div>
                {/* Matchmaking Modal, appears when 'isPlaying' is true */}
                <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 ${isPlaying ? 'opacity-100' : 'opacity-0'} z-50`}
     style={{ width: "65vw", height: "65vh" }}
     oncreate={applyModalTransition}
     onupdate={applyModalTransition}>
    {/* Modal content here */}
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
