import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editPin, getPin } from "../../redux/pins";
import { fetchAllBoards } from "../../redux/board";
import { postBoardPin } from "../../redux/board";
import { useModal } from "../../context/Modal";
import BoardDropdown from "../BoardDropdown/BoardDropdown";
import "./EditPin.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeletePin from "../DeletePin/DeletePin"

const EditPin = ({ pinId }) => {
    const user = useSelector((state) => state.session.user);
    const pin = useSelector(state => state.pinState.pin);
    const boardObj = useSelector(state => state.boardState);
    const boards = Object.values(boardObj);
    const userBoards = boards.filter((board) => board.user_id == user.id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [titleError, setTitleError] = useState("");
    const [linkError, setLinkError] = useState("");

    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();

    const openEditPin = () => {
        setModalContent(<EditPin pinId={pinId} />);
    };

    useEffect(() => {
        if (pinId) {
            dispatch(getPin(pinId));
        }
        dispatch(fetchAllBoards());
    }, [dispatch, pinId]);

    useEffect(() => {
        if (pin) {
            setTitle(pin.title || "");
            setDescription(pin.description || "");
            setLink(pin.link || "");
        }
    }, [pin]);

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim().length < 1) {
            setTitleError("A title is required.");
            return;
        }

        if (link && !isValidURL(link)) {
            setLinkError("Please enter a valid URL.");
            return;
        }

        const editedPin = {
            image: pin.img_url,
            title,
            description: description.trim() || null,
            link,
        };

        let boardResponse = true;
        if (selectedBoard) {
            boardResponse = await dispatch(postBoardPin(+selectedBoard, pinId));
        }

        const pinResponse = await dispatch(editPin({ editedPin, pinId }));

        if (pinResponse && boardResponse) {
            await dispatch(getPin(pinId));
            closeModal();
        }
    };

    const imageBoardIds = pin.boards ? pin.boards.map(board => board.id) : [];

    return (
        <div className="edit-pin-container">
            <h1 className="edit-pin-title">Edit Pin</h1>
            <form onSubmit={handleSubmit}>
                <div className="edit-pin-field-container">
                    <label className="edit-pin-label">
                        Title {titleError && <p className="error-message">{titleError}</p>}
                    </label>
                    <input
                        type="text"
                        placeholder="Add a title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (e.target.value.trim().length >= 1) {
                                setTitleError(""); // Clear the error if the title meets the criteria
                            }
                        }}
                        className="edit-pin-input"
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label className="edit-pin-label">
                        Description
                    </label>
                    <textarea
                        placeholder="Write a detailed description for your Pin here or add a specific"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="edit-pin-input edit-pin-text"
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label className="edit-pin-label">
                        Link {linkError && <p className="error-message">{linkError}</p>}
                    </label>
                    <input
                        type="text"
                        placeholder="Add a link"
                        value={link}
                        onChange={(e) => {
                            setLink(e.target.value);
                            if (isValidURL(e.target.value)) {
                                setLinkError(""); // Clear the error if the link is valid
                            }
                        }}
                        className="edit-pin-input"
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label className="edit-pin-label">
                        Board
                    </label>
                    <BoardDropdown
                        boards={userBoards}
                        selectedBoard={selectedBoard}
                        onSelectBoard={setSelectedBoard}
                        imageBoardIds={imageBoardIds}
                    />
                </div>
                <div className="edit-pin-buttons">
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeletePin openEditPin={openEditPin} />}
                        className="edit-delete-pin"
                        pinId={pinId}
                    />
                    <button type="submit" className="edit-pin-save-button">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditPin;
