import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editPin, getPin } from "../../redux/pins";
// import { useNavigate } from 'react-router-dom';
import { fetchAllBoards } from "../../redux/board";
import { postBoardPin } from "../../redux/board";
import { useModal } from "../../context/Modal";
import "./EditPin.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeletePin from "../DeletePin/DeletePin"

const EditPin = ({ pinId }) => {
    console.log("Received pinId in EditPin:", pinId);
    const user = useSelector((state) => state.session.user);
    const pin = useSelector(state => state.pinState.pin)
    const boardObj = useSelector(state => state.boardState)
    const boards = Object.values(boardObj)
    const userBoards = boards.filter((board) => board.user_id == user.id)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [board, setBoard] = useState("")

    const dispatch = useDispatch()
    // const navigate = useNavigate();
    const { closeModal, setModalContent } = useModal();

    // const deleteCurrentPin = async (e) => {
    //     e.preventDefault();
    //     closeModal()
    //     await dispatch(deletePin(pinId));
    //     navigate(`/${user.id}/created`)
    // };

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
            setTitle(pin.title || "")
            setDescription(pin.description || "")
            setLink(pin.link || "")
        }
    }, [pin])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedPin = {
            image: pin.img_url,
            title,
            description,
            link,
        };

        let boardResponse = true;
        if (board) {
            boardResponse = await dispatch(postBoardPin(+board, pinId));
        }

        const pinResponse = await dispatch(editPin({ editedPin, pinId }));

        if (pinResponse && boardResponse) {
            await dispatch(getPin(pinId));
            closeModal();
        }
    };

    return (
        <div className="edit-pin-container">
            <h1 className="edit-pin-title">Edit Pin</h1>
            <form onSubmit={handleSubmit}>
                <div className="edit-pin-field-container">
                    <label className="edit-pin-label">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Add a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        Link
                    </label>
                    <input
                        type="text"
                        placeholder="Add a link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="edit-pin-input"
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label className="edit-pin-label">
                        Board
                    </label>
                    <select name='board' value={board} onChange={(e) => { setBoard(e.target.value) }} className="edit-pin-input">
                        <option value='' className="select-placeholder" disabled>Choose board</option>
                        {userBoards.map((board) => (
                            <option key={board.id} value={board.id}>{board.name === 'All Pins' ? 'Profile' : `${board.name}`}</option>
                        ))
                        }
                    </select>
                </div>
                <div className="edit-pin-buttons">
                    {/* <button onClick={(e) => deleteCurrentPin(e)}>Delete</button> */}
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
