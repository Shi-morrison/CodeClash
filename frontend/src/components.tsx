import m from "mithril";
import { User, LoginData, UserInterface } from "./model";

export function Nav() {
    return {
        view: () => [
            m(".navbar", [
                m(".title", "Code Clash"),
                User.isLoggedIn() 
                    ? m(m.route.Link, { href: "/logout" }, "Logout") 
                    : m(".auth-buttons", [
                        m(m.route.Link, { href: "/login" }, "Login"),
                        m(m.route.Link, { href: "/signup" }, "Sign Up")
                    ])
            ])
        ]
    }
}
export function Menu () {
    return {
        view: () => [
            m(".menu", [
                m(m.route.Link, { href: "/vsmode" }, [
                    m(".menu-item-container", [
                        m(".custom-shape"),
                        m(".vs-Mode", m("h2", "VS Mode"))
                    ])
                ]),
                m(".menu-item-container", [
                    m(".custom-shape"),
                    m(".practice", m("h2", "Practice"))
                ]),
                m(".menu-item-container", [
                    m(".custom-shape"),
                    m(".special-mode", m("h2","Special Mode"))
                ]),
                m(".menu-item-container", [
                    m(".custom-shape"),
                    m(".settings", m("h2","Settings"))
                ])
            ])
        ]
    }
}

export function Login() {
    let loginData: LoginData = { username: "", password: "" };

    function handleSubmit() {
        // Handle the submission logic here
        console.log("Logging in with", loginData);
    }

    return {
        view: () => [
            m("h2", "Login"),
            m("input[type=text]", {
                placeholder: "Username",
                oninput(this: HTMLInputElement) { loginData.username = this.value; }
            }),
            m("input[type=password]", {
                placeholder: "Password",
                oninput(this: HTMLInputElement) { loginData.password = this.value; }
            }),
            m("button", { onclick: handleSubmit }, "Login"),
        ],
    };
}

export function SignUp() {
    let userData: UserInterface = { username: "", password: "" };

    function handleSubmit() {
        // Handle the registration logic here
        console.log("Registering user:", userData);
    }

    return {
        view: () => [
            m("h2", "Sign Up"),
            m("input[type=text]", {
                placeholder: "Username",
                oninput: (e: any) => userData.username = e.target.value
            }),
            m("input[type=password]", {
                placeholder: "Password",
                oninput: (e: any) => userData.password = e.target.value
            }),
            m("button", { onclick: handleSubmit }, "Sign Up"),
        ],
    };
}

var Splash = {
    view: function() {
        return m("a", {href: "#!/hello"}, "Enter!")
    }
}