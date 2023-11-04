import m from "mithril";
import  Login from "./pages/Login";

function App() {
    return {
        view: () => (
            <div>
                <Login/>
                <h1 class="text-red-500">Hello world</h1>
            </div>
        ),
    };
}

m.route(document.body, "/", {
    "/": App
});