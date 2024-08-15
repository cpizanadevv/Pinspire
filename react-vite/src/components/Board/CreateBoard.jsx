import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBoard } from "../../redux/board";
import "./CreateBoard.css";
import { useSelector, useDispatch } from "react-redux";

const CreateBoard = () => {
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

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) return;

        const boardBody = {
            name,
            private: privacy,
            user_id: currUser.id,
        }

        let createdBoard = await dispatch(postBoard(boardBody));

        navigate(`/boards/${createdBoard.id}`, { replace: true})
    }

    return (
        <form id="form" onSubmit={handleSubmit}>
            <h1>Create a Board</h1>
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
            <div className="privacy-container">
                <label htmlFor="privacy">Set Privacy</label>
                <input
                type="checkbox"
                id="privacy"
                name="private"
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
                />
                {/* {hasSubmitted && errors.privacy && (
                    <span>{errors.privacy}</span>
                )} */}
            </div>
            <button type="submit" className="submit-button">
                Create Board
            </button>
        </form>
    );
}

export default CreateBoard;
