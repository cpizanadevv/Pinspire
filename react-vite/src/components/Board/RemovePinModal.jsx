import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteBoardPin } from "../../redux/board";
import "./RemovePinModal.css";

const DeleteModal = ({ pinId, boardId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        if (pinId && boardId) {
            dispatch(deleteBoardPin(boardId, pinId)).then(() => {
                closeModal();
            });
        } else {
            console.error("pinId or boardId is missing");
        }
    };

    return (
        <div className="remove-pin-modal-container">
            <h1 className="remove-pin-modal-title">
                Are you sure you want to remove this pin?
            </h1>
            <div className="remove-pin-modal-buttons">
                <button
                    className="remove-pin-modal-confirm"
                    onClick={handleDelete}
                >
                    Confirm
                </button>
                <button
                    className="remove-pin-modal-cancel"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteModal;
