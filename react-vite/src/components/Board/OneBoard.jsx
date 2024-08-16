import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBoard } from "../../redux/board";
import "./OneBoard.css";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteModal from "./DeletePinModal";

const OneBoard = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const boardObj = useSelector((state) => state.boardState);
  const board = Object.values(boardObj)[0] || {};

  useEffect(() => {
    dispatch(fetchOneBoard(boardId));
  }, [dispatch, boardId]);

  const boardPins = board.pins || [];

  if (!board || !board.name) return <h1>Loading...</h1>;

  console.log('AAAAAAAAAAAA', board)
  return (
    <div id="one-board-container">
      <ul className="one-board">
        <li>{board.name}</li>
      </ul>
      <div className="pins-container">
        <div className="created-grid">
          {boardPins.length > 0 ? (
            boardPins.map((pin) => (
              <div key={pin.id} className="profile-pin-container">
                <img src={pin.img_url} alt={pin.title} />
                <div className="profile_image_overlay">
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteModal/>}
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
