import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteBoardPin } from "../../redux/board";

const DeleteModal = ({ pinId, boardId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log("DeleteModal - pinId:", pinId); // Log pinId
    console.log("DeleteModal - boardId:", boardId); // Log boardId

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
      <div>
        <h1>Are you sure you want to delete this pin?</h1>
        <button onClick={handleDelete}>Confirm</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    );
  };

export default DeleteModal;
