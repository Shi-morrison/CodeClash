import InfoAndIDE from "../components/InfoAndIDE";
import MainPageInfo from "../components/MainPageInfo";
import Title from "../components/Title"

function Login() {
    return {
        view: () => (
            <>
                <Title />
                <InfoAndIDE />
            </>
        ),
    };
}

export default Login;