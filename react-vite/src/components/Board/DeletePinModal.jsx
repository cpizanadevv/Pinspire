import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteBoardPin } from "../../redux/board";

const DeleteModal = ({ pinId, boardId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteBoardPin(boardId, pinId)).then(() => {
            closeModal();
        });
    };

    return (
        <div>
            <h1>Are you sure you want to delete this pin?</h1>
            <button onClick={handleDelete}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteModal;
