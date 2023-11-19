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

    return {
        view: () => (
            <>
                <div className="flex justify-center mt-24 glow">
                    <div className="text-white profile flex flex-row relative">
                        <div className="pt-12 pl-12 flex flex-col relative">
                            <img className="imgProfile rounded cursor-pointer" src={userData.profilePicture || '/path/to/default/image.jpg'} onclick={triggerFileInput} />
                            <input type="file" id="hiddenFileInput" style={{ display: "none" }} onchange={handleFileChange} />

                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <div className="pt-2 text-[36px]">{userData.username}</div>
                                        {userData.username !== '...Loading' && <Flag />}
                                    </div>
                                    {userData.elo !== '' && userData.rank !== '' && (
                                        <div className="text-[24px]">{userData.elo}/{userData.rank}</div>
                                    )}
                                    <div className="pt-6 lg:mt-6">
                                        <div>Achievements</div>
                                        <div className="achievements absolute w-[50vw]">
                                            Achievement
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 sm:ml-4 md:ml-8 profileInfo">
                            <ProfileInfo />
                        </div>
                        <div className="absolute top-2 right-2 cursor-pointer">X</div>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile;
