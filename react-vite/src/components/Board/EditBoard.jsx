import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchOneBoard } from "../../redux/board";
import "./EditBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as boardActions from "../../redux/board";
const PutBoard = ({ boardId }) => {
    // const currUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const board = useSelector((state) => state.boardState[boardId]); // Correctly accessing the board by ID
    const { closeModal } = useModal();

    const [name, setName] = useState("");
    const [privacy, setPrivacy] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        let formErrors = {};

        if (!name) formErrors.name = "Name is required";

        setErrors(formErrors);
    }, [name]);

    useEffect(() => {
        dispatch(fetchOneBoard(boardId));
    }, [dispatch, boardId]);

    useEffect(() => {
        if (board) {
            setName(board.name || "");
            setPrivacy(board.privacy || false);
            setDescription(board.description || " "); // Ensure description is set properly
        }
    }, [board]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) return;

        const boardBody = {
            name,
            private: privacy,
            description,
        };

        try {
            // Dispatch the update action
            await dispatch(boardActions.putBoard(boardBody, boardId));
            closeModal(); // Close the modal
            // Optionally, you can trigger a refresh of the board state if needed
            // For example, by dispatching an action to fetch the updated board
            dispatch(fetchOneBoard(boardId));
        } catch (error) {
            console.error("Error updating board:", error);
        }
    };

    return (
        <div className="edit-board-container">
            <h1 className="edit-board-title">Edit Board</h1>
            <form id="form" onSubmit={handleSubmit}>
                <div className="edit-board-field-container">
                    <label className="edit-board-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="edit-board-input"
                    />
                    {hasSubmitted && errors.name && <span>{errors.name}</span>}
                </div>
                <div className="edit-board-field-container">
                    <label className="edit-board-label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="edit-board-input edit-board-text"
                    ></textarea>
                </div>
                <div className="edit-board-privacy-container">
                    <label className="edit-board-label" htmlFor="privacy">
                        Set Privacy
                    </label>
                    <input
                        type="checkbox"
                        id="privacy"
                        name="private"
                        checked={privacy}
                        onChange={(e) => setPrivacy(e.target.checked)}
                        className="edit-board-privacy"
                    />
                </div>
                <div className="edit-board-buttons">
                    <button type="submit" className="edit-board-save-button">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PutBoard;
