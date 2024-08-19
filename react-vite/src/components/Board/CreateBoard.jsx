import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBoard } from "../../redux/board";
import "./CreateBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
const CreateBoard = () => {
    const { closeModal } = useModal();
    const currUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [name, setName] = useState("");
    const [privacy, setPrivacy] = useState(false);

    useEffect(() => {
        let formErrors = {};

        if (!name) formErrors.name = "Name is required";
        // if (!privacy) formErrors.privacy = "Need to set privacy"; // shouldn't appear

        setErrors(formErrors);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) return;

        const boardBody = {
            name,
            private: privacy,
            user_id: currUser.id,
        };

        try {
            const createdBoard = await dispatch(postBoard(boardBody));
            closeModal();
            navigate(`/boards/${createdBoard.id}`, { replace: true });
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    return (
        <div className="create-board-container">
            <h1 className="create-board-title">Create a Board</h1>
            <form id="form" onSubmit={handleSubmit}>
                <div className="create-board-field-container">
                    <label className="create-board-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="create-board-input"
                    />
                    {hasSubmitted && errors.name && <span>{errors.name}</span>}
                </div>
                <div className="create-board-privacy-container">
                    <label className="create-board-label" htmlFor="privacy">
                        Set Privacy
                    </label>
                    <input
                        type="checkbox"
                        id="privacy"
                        name="private"
                        checked={privacy}
                        onChange={(e) => setPrivacy(e.target.checked)}
                        className="create-board-privacy"
                    />
                </div>
                <div className="create-board-buttons">
                    <button type="submit" className="create-board-save-button">
                        Create Board
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBoard;
