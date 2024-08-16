import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBoard } from "../../redux/board";
import "./OneBoard.css";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteModal from "./DeletePinModal";
import PutBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";

const OneBoard = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  // Access the board directly by its ID
  const board = useSelector((state) => state.boardState[boardId]);

  useEffect(() => {
    dispatch(fetchOneBoard(boardId));
  }, [dispatch, boardId]);

  const boardPins = board?.pins || [];

  if (!board || !board.name) return <h1>Loading...</h1>;

  return (
    <div id="one-board-container">
      <div className="one-board-name">
        <h1>{board.name}</h1>
        <p>{board.description}</p>
        <div className='edit-board-modal-container'>
          <OpenModalButton
            buttonText="Edit Board"
            modalComponent={<PutBoard />}
            className="edit-modal"
            boardId={boardId}
          />
          <OpenModalButton
            buttonText="Delete Board"
            modalComponent={<DeleteBoard />}
            className="delete-modal"
            boardId={boardId}
          />
        </div>
      </div>
      <div className="pins-container">
        <div className="created-grid">
          {boardPins.length > 0 ? (
            boardPins.map((pin) => (
              <div key={pin.id} className="profile-pin-container">
                <img src={pin.img_url} alt={pin.title} />
                <div className="profile_image_overlay">
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteModal />}
                    className="save-button"
                    pinId={pin.id}
                    boardId={boardId}
                  />
                </div>
              </div>
            ))
          ) : (
            <li>No pins available for this board.</li>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneBoard;
