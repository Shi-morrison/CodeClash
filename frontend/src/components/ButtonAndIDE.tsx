
import IDE from "./IDE";

function InfoAndIDE() {
    return {
        view: () => (
            <>
                <div className="flex flex-col items-center w-120">
                    <div className="flex items-center">
                        <IDE />
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <button>button1</button>
                        <button>button2</button>
                    </div>
                </div>
            </>
        ),
    };
}

export default InfoAndIDE;