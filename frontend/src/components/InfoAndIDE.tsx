import MainPageInfo from "./MainPageInfo";
import IDE from "./IDE";

function InfoAndIDE() {
    return {
        view: () => (
            <>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                        <MainPageInfo />
                        <IDE />
                    </div>
                </div>
            </>
        ),
    };
}

export default InfoAndIDE;