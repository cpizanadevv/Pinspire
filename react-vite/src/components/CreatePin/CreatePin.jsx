import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { addPin } from '../../redux/pins';
import './CreatePin.css';

const CreatePin = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [linkError, setLinkError] = useState("");
    const [titleError, setTitleError] = useState("");
    const imageInputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFile(selectedFile);
    };

    const handleFile = (selectedFile) => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                setIsImageUploaded(true);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if (title.trim().length < 1) {
            setTitleError("A title is required.");
            return;
        }

        if (link && !isValidURL(link)) {
            setLinkError("Please enter a valid URL.");
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
            // setImageUrl(data.img_url);
            navigate(`/pin/${data.id}`); //nav to ViewPin
        } else {
            alert("Error uploading file");
        }
    };

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleReplaceImage = () => {
        imageInputRef.current.click();
    };

    const handlePublish = () => {
        handleSubmit(new Event('submit', { cancelable: true, bubbles: true }));
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior
        e.stopPropagation(); // Prevent event bubbling
    };

    const handleDrop = (e) => {
        e.preventDefault(); // Prevent default behavior
        e.stopPropagation(); // Prevent event bubbling
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value.trim().length >= 1) {
            setTitleError(""); // Clear the error if the title meets the criteria
        }
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
        if (isValidURL(e.target.value)) {
            setLinkError(""); // Clear the error if the link is valid
        }
    };

    return (
        <div className='create-pin-container'>
            <div className="header">
                <h2>Create Pin</h2>
                {isImageUploaded && (
                    <button className='publish-button-header' onClick={handlePublish}>
                        Publish
                    </button>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="left-column">
                    <div
                        className='choose-file'
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            onChange={handleFileChange}
                            ref={imageInputRef}
                            style={{ display: 'none' }}
                        />
                        {!isImageUploaded && (
                            <button
                                type='button'
                                className='choose-file-button'
                                onClick={() => imageInputRef.current.click()}
                            >
                                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                Choose a file or drag and drop it here
                            </button>
                        )}
                        {isImageUploaded && (
                            <div className='uploaded-image-container'>
                                <img
                                    src={imageSrc}
                                    alt="Uploaded"
                                />
                                <span></span>
                                <button
                                    type='button'
                                    className='replace-file-button'
                                    onClick={handleReplaceImage}
                                >
                                    Replace Image
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`right-column ${!isImageUploaded ? 'disabled' : ''}`}>
                    <div className="title">
                        <h5>Title {titleError && <p className="error-message">{titleError}</p>}</h5>
                        <input
                            type="text"
                            placeholder="Add a title"
                            value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                            onChange={handleTitleChange}
                            disabled={!isImageUploaded}
                        />
                    </div>
                    <div className="description">
                        <h5>Description</h5>
                        <textarea
                            placeholder="Add a detailed description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={!isImageUploaded}
                        />
                    </div>
                    <div className="link">
                        <h5>Link {linkError && <p className="error-message">{linkError}</p>}</h5>
                        <input
                            type="text"
                            placeholder="Add a link"
                            value={link}
                            // onChange={(e) => setLink(e.target.value)}
                            onChange={handleLinkChange}
                            disabled={!isImageUploaded}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreatePin;
