import m from "mithril";
import  Login from "./pages/Login";

function App() {
    return {
        view: () => (
            <div>
                <Login/>
            </div>
        ),
    };
}

m.route(document.body, "/", {
    "/": App
});