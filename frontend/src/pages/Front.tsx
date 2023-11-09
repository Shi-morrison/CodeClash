import ButtonAndIDE from "../components/ButtonAndIDE";
import Title from "../components/Title"
import 'particles.js/particles';

function Particles() {
    return {
        oncreate: () => {
            const particlesJS = (window as any).particlesJS;
            particlesJS.load('particles-js', './particles.json', function() {
                console.log('callback - particles-js config loaded');
            });
        },
        view: () => {
            return <div id="particles-js" class="particles-container"></div>;
        },
    };
}

function Login() {
    return {
        view: () => (
            <div className="max-h-screen">
                <Particles />
                <div className="content-container flex flex-col">
                    <Title />
                    <ButtonAndIDE />
                </div>
            </div>
        ),
    };
}

export default Login;