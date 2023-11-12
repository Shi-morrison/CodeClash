import m, { VnodeDOM } from "mithril";
import { drawMainMenu, drawMainMenuInit } from "../components/mainMenu/mainInit";

const MainMenuPage = {
    oncreate: (vnode: VnodeDOM) => {

        const uiCanvas = vnode.dom.querySelector('#uiCanvas') as HTMLCanvasElement;
        const fg1Canvas = vnode.dom.querySelector('#fg1Canvas') as HTMLCanvasElement;
        const fg2Canvas = vnode.dom.querySelector('#fg2Canvas') as HTMLCanvasElement;
        const bg1Canvas = vnode.dom.querySelector('#bg1Canvas') as HTMLCanvasElement;
        const bg2Canvas = vnode.dom.querySelector('#bg2Canvas') as HTMLCanvasElement;

        const setCanvasSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            [bg1Canvas, bg2Canvas, fg1Canvas, fg2Canvas, uiCanvas].forEach(canvas => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        };
        setCanvasSize();

        const ui = uiCanvas.getContext('2d');
        const fg1 = fg1Canvas.getContext('2d');
        const fg2 = fg2Canvas.getContext('2d');
        const bg1 = bg1Canvas.getContext('2d');
        const bg2 = bg2Canvas.getContext('2d');

        if (bg1 && bg2 && fg1 && fg2 && ui) {
            drawMainMenuInit(bg1Canvas, bg1, bg2, fg1, fg2, ui);
            const animate = () => {
                drawMainMenu(uiCanvas, fg2Canvas, bg2Canvas, bg1, bg2, fg1, fg2, ui);
                requestAnimationFrame(animate);
            };
            animate();
        } else {
            console.error("Failed to get canvas rendering contexts");
        }
    },
    view: () => {
        return m("div", { id: "main-menu-container", style: { position: 'relative' }},
            m("canvas", { id: "bg2Canvas", style: { position: 'absolute', top: 0, left: 0 } }),
            m("canvas", { id: "bg1Canvas", style: { position: 'absolute', top: 0, left: 0 } }),
            m("canvas", { id: "fg2Canvas", style: { position: 'absolute', top: 0, left: 0 } }),
            m("canvas", { id: "fg1Canvas", style: { position: 'absolute', top: 0, left: 0 } }),
            m("canvas", { id: "uiCanvas", style: { position: 'absolute', top: 0, left: 0 } }),
        );
    }
};

export default MainMenuPage;
