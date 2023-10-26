import m from "mithril";
import { Login, Menu, SignUp, Nav } from "./components";
import { vsModePage } from "./vsmode/page";
import { gamePageContent } from "./game/gameContent";

function App() {
    return {
        view: () => [
			m("video#background-video[autoplay][muted][loop][disablePictureInPicture]", {
				src: "bg.mp4",
				oncontextmenu: (e:any) => { e.preventDefault(); }
			}),
			m(Nav),
            m(Menu),
            
        ],

    };
}

m.route(document.body, "/", {
    "/": App,
	"/login": Login,
	"/signup": SignUp,
	"/vsmode": vsModePage,
	"/game": gamePageContent
});