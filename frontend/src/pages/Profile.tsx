import m from 'mithril';
import axios from 'axios';
import Flag from "../components/Flag";
import ProfileInfo from "../components/ProfileInfo";
import { userData } from "../user-data";

function Profile() {

    let image = ''; // State for storing the image data

    // Function to trigger hidden file input
    function triggerFileInput() {
        document.getElementById('hiddenFileInput')!.click();
    }

    // Handle file selection and upload
    function handleFileChange(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) return;

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
                image = reader.result;
                // Initiate the upload after the file is processed
                await handleUpload();
                m.redraw(); // Update the view
            }
        };

        reader.readAsDataURL(file);
    }

    // Handle file upload
    async function handleUpload() {
        console.log("userData.ID", userData.ID);
        console.log("image", image);
        if (!userData.ID || !image) return;

        try {
            await axios.post(`/api/upload/${userData.ID}`, { image }, {
                withCredentials: true
            });
            window.location.reload();
            m.redraw();
        } catch (error) {
            console.error('Upload error:', error);
        }
    }

    return { //doing the brian method
        view: (vnode: m.Vnode<{
            userData?: any;
            onclose?: () => void;
        }>) => {
            const udata = (vnode.attrs.userData ?? userData);
            return <>
                <div className="z-50 fixed w-screen flex justify-center mt-24 glow">
                    <div className="text-white profile flex flex-row relative">
                        <div className="p-12 flex flex-col relative">
                            <img className={`imgProfile rounded ${vnode.attrs.userData !== undefined ? "" : "cursor-pointer"}`}
                                src={udata.profilePicture || '/path/to/default/image.jpg'}
                                onclick={vnode.attrs.userData !== undefined ? (() => {}) : triggerFileInput} />
                            <input type="file" id="hiddenFileInput" style={{ display: "none" }} onchange={handleFileChange} />

                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <div className="pt-2 text-[36px]">{udata.username}</div>
                                        {udata.username !== '...Loading' && <Flag />}
                                    </div>
                                    {udata.elo !== '' && udata.rank !== '' && (
                                        <div className="text-[24px]">{udata.elo}/{udata.rank}</div>
                                    )}
                                    <div className="pt-6 mb-12">
                                        <div className="achievements pb-6">
                                            <ProfileInfo mobile={true} userData={vnode.attrs.userData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="absolute top-2 right-2 mr-[8px] text-[24px] cursor-pointer" onclick={() => {
                                if (vnode.attrs.onclose){
                                    console.log("clicked!");
                                    vnode.attrs.onclose();
                                }
                            }}>X</button>
                    </div>
                </div>
            </>;
        }
    }
}

export default Profile;
