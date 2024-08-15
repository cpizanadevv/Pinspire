import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { putBoard, fetchOneBoard } from "../../redux/board";
import "./EditBoard.css";
import { useSelector, useDispatch } from "react-redux";

const PutBoard = () => {
    const { boardId } = useParams()
    const currUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [name, setName] = useState("");
    const [privacy, setPrivacy] = useState(false);
    const [description, setDescription] = useState("");

    const boardToUpdate = useSelector((state) => state.boardState[1])
    useEffect(() => {
        let formErrors = {};

        if (!name) formErrors.name = "Name is required";
        // if (!privacy) formErrors.privacy = "Need to set privacy"; // shouldn't appear

        setErrors(formErrors);
    }, [name]);

    useEffect(() => {
        dispatch(fetchOneBoard(boardId))
    }, [dispatch, boardId])

    useEffect(() => {
        if (boardToUpdate) {
            setName(boardToUpdate.name || ""); // Ensure non-undefined
            setPrivacy(boardToUpdate.privacy || false); // Ensure non-undefined
            setDescription(boardToUpdate.description || ""); // Ensure non-undefined
        }
    }, [boardToUpdate])

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) return;

        const boardBody = {
            name,
            private: privacy,
            user_id: currUser.id,
            ...(description && { description })
        }

        const updatedBoard = await dispatch(putBoard(boardBody, boardToUpdate.id));

        navigate(`/boards/${updatedBoard.board.id}`, { replace: true })
    }
        return (
            <form id="form" onSubmit={handleSubmit} >
            <h1>Edit Board</h1>
            <div className="name-container">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                value={name}
                id="name"
                name="name"
                onChange={e => setName(e.target.value)}
                />
                {hasSubmitted && errors.name && (
                    <span>{errors.name}</span>
                )}
            </div>
            <div className='description-container'>
                <label htmlFor='description'>Description</label>
                <textarea
                id='description'
                name='description'
                onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="privacy-container">
                <label htmlFor="privacy">Set Privacy</label>
                <input
                type="checkbox"
                id="privacy"
                name="private"
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
                />
            </div>
            <button type="submit" className="submit-button">
                Create Board
            </button>
        </form>
    );
}

export default PutBoard
