import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { editPin, getPin } from "../../redux/pins";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAllBoards } from "../../redux/board";
import "./EditPin.css"

const EditPin = () => {
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
    const navigate = useNavigate();
    const { pinId } = useParams()

    useEffect(() => {
        dispatch(getPin(pinId))
        dispatch(fetchAllBoards())
    }, [dispatch, pinId])

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
            link
        }

        const response = await dispatch(editPin({editedPin, pinId}))
        console.log(response)

        // if (response) {
        //     navigate("/")
        // }
    
    };

    return (
        <div className="edit-pin-container">
            <h1>Edit Pin</h1>
            <form onSubmit={handleSubmit}>
                <div className="edit-pin-field-container">
                    <label>
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Add a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label>
                        Description
                    </label>
                    <textarea
                        placeholder="Write a detailed description for your Pin here or add a specific"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label>
                        Link
                    </label>
                    <input
                        type="text"
                        placeholder="Add a link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div className="edit-pin-field-container">
                    <label>
                        Board
                    </label>
                    <select name='board' value={board} onChange={(e) => {setBoard(e.target.value)}}>
                        <option value='' disabled>Choose board</option>
                        {userBoards.map((board) => (
                                <option key={board.id} value={board.id}>{board.name === 'All Pins' ? 'Profile' : `${board.name}`}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="edit-pin-buttons">
                    <button>Delete</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );


}

export default EditPin;