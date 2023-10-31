import m from "mithril";


function App() {
    return {
        view: () => (
            <div>
                <h1>Hello world</h1>
            </div>
        ),
    };
}

m.route(document.body, "/", {
    "/": App
});