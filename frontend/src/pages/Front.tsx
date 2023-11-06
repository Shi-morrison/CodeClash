import InfoAndIDE from "../components/ButtonAndIDE";
import Title from "../components/Title"

function Login() {
    return {
        view: () => (
            <>
            <div className="max-h-screen">
                <div>
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <div className="flex flex-col">
                    <Title />
                    <InfoAndIDE />
                </div>
            </div>
            </>
        ),
    };
}

export default Login;