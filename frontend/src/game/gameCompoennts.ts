import m from "mithril";
import '../../styles/style.scss';
let codeContent: string = "";

export function problem() {
    return {
        view: () => [
            m(".w-1/3 p-4", [
                m("h1.text-xl font-bold", "Problem Title"),
                m("p", "Some problem description from LeetCode...")
            ])
        ]
    }
}

export function userCodeEditor() {
    return {
        view:() => [
            m(".w-1/3 p-4", [
                m("h2.text-lg font-semibold", "Your Code"),
                m("textarea.h-64 w-full", {
                    placeholder: "Type your code here...",
                    oninput: (e: any) => codeContent = e.target.value
                })
            ])
        ]
    }
}

export function blurredEditor() {
    return {
        view:() => [
            m(".w-1/3 p-4", [
                m("h2.text-lg font-semibold", "Opponent's Code"),
                m("textarea.h-64 w-full bg-opacity-50 blur-md", {
                    value: codeContent,
                    readonly: true
                })
            ])
        ]
    }
}
