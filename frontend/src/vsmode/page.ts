import m from "mithril";
import { Nav } from "../components";

export function vsModePage() { 
    return {
        view: () => [
            m(Nav),
            m("h1","Queue up for match making"),
            m("button#buttonRed", "Queue Up")

        ]
    }
}