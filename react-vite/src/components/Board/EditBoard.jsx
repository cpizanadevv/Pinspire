import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchOneBoard } from "../../redux/board";
import "./EditBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as boardActions from '../../redux/board'
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
            description
        };

        try {
            dispatch(boardActions.putBoard(boardBody, boardId));
            closeModal(); // Close the modal
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error("Error updating board:", error);
        }
    };

    return (
        <form id="form" onSubmit={handleSubmit}>
            <h1>Edit Board</h1>
            <div className="name-container">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={name}
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                />
                {hasSubmitted && errors.name && <span>{errors.name}</span>}
            </div>
            <div className="description-container">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="privacy-container">
                <label htmlFor="privacy">Set Privacy</label>
                <input
                    type="checkbox"
                    id="privacy"
                    name="private"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                />
            </div>
            <button type="submit" className="submit-button">
                Save Changes
            </button>
        </form>
    );
};

export default PutBoard;
