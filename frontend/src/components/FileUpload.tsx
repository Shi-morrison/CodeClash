import m from 'mithril';
import axios from 'axios';

interface FileUploadProps {
    userId: string;
}

// Separate state and methods from the component
let image = '';

function handleFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            image = reader.result;
            m.redraw(); // Update the view
        }
    };

    reader.readAsDataURL(file);
}

async function handleUpload(userId: string) {
    try {
        await axios.post(`http://localhost:44251/api/upload/${userId}`, { image }, {
            withCredentials: true
        });
        alert('Profile picture uploaded successfully');
    } catch (error) {
        console.error('Upload error:', error);
    }
}

const FileUpload: m.Component<FileUploadProps> = {
    view({ attrs }) {
        return m('div',
            m('input[type=file]', { onchange: handleFileChange }),
            m('button', { onclick: () => handleUpload(attrs.userId) }, 'Upload')
        );
    }
};

export default FileUpload;
