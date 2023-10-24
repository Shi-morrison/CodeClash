import m from "mithril";

let counter = 0;

function App() {
	return {
		view: () => [
			m("button", {
				onclick: () => counter++,
			}, "Increment"),
			m("button", {
				onclick: () => counter--,
			}, "Decrement"),
			m("p", `Counter is at ${counter}`),
		],
	};
}

m.route(document.body, "/", {
	"/": App,
});
