import { useModal } from "../../context/Modal";
import { deletePin } from "../../redux/pins";
import { useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import "./DeletePin.css"
const DeletePin = ({pinId, openEditPin}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userId } = useParams()
    const { closeModal } = useModal();

    const handleCancel = async (e) => {
        e.preventDefault();
        closeModal()
        openEditPin()
    }

    const deleteCurrentPin = async (e) => {
        e.preventDefault();
        closeModal()
        await dispatch(deletePin(pinId));
        navigate(`/${userId}/created`)
    };

    return (
        <div className="delete-pin-modal-container">
            <h1 className="delete-pin-modal-title">Are you sure?</h1>
            <p className="delete-pin-modal-text">If you delete this Pin, it`&apos;`ll be gone for good and those who`&apos;`ve saved it won`&apos;`t be able to view it.</p>
            <div className="delete-pin-modal-buttons">
                <button className="delete-pin-modal-cancel" onClick={(e) => handleCancel(e)}>Cancel</button>
                <button className="delete-pin-modal-assert" onClick={(e) => deleteCurrentPin(e)}>Delete</button>
            </div>
        </div>
    )
}

export default DeletePin