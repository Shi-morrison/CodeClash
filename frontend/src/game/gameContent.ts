import m from "mithril";
import { userCodeEditor, problem, blurredEditor } from "./gameCompoennts";
export function gamePageContent() {
    return {
        view:() => [
            m(".flex h-screen", [
                m(userCodeEditor),
                m(problem),
                m(blurredEditor)
            ])
        ]
    }
}