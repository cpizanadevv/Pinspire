import { useDispatch } from 'react-redux';
import { useState } from "react";
import { addPin } from '../../redux/pins';

const CreatePin = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const newPin = {
            file,
            title,
            description,
            link
        };

        const data = await dispatch(addPin(newPin));
        if (data.img_url) {
            setImageUrl(data.img_url);
            console.log("Pin added to the database:", data);
        } else {
            alert("Error uploading file");
            console.log("Error uploading file:", data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit">Upload</button>
            </form>
            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
                </div>
            )}
        </div>
    );
};

export default CreatePin;
