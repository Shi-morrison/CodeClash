import InfoAndIDE from "../components/ButtonAndIDE";
import Title from "../components/Title"

function Login() {
    return {
        view: () => (
            <>
            <div className="flex flex-col">
                <Title />
                <InfoAndIDE />
            </div>
            </>
        ),
    };
}

export default Login;