import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as boardActions from "../../redux/board";

function PinComponent({ pin }) {
  const [hovered, setHovered] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const boardObj = useSelector((state) => state.boardState);
  const boards = Object.values(boardObj);

  const allBoards = Object.values(boards);
  const usersBoards = allBoards.filter((board) => board.user_id === user.id);
  // const isLiked = '';
  // const fave = useSelector((state) => state.)

  //! GET CURR USER BOARDS
  useEffect(() => {
    dispatch(boardActions.fetchAllBoards());
  }, [dispatch]);

  const handleHover = () => {
    setHovered(true);
  };

  const handleNotHovered = () => {
    setHovered(false);
  };

  // ! Waiting on thunks

  //   const handleAddToBoard = () => {
  //     useEffect(() => {
  //       dispatch(boardActions.addPinToBoard(pin.id, boardId));
  //     }, [dispatch, pinId, boardId]);
  //   };
  // const handleFave = () => {

  // }

  return (
    <>
      {hovered && (
        <div
          className="pin-hover"
          onMouseEnter={handleHover}
          onMouseLeave={handleNotHovered}
        >
          <h4>{pin.title}</h4>
          {/* DROP DOWN FOR BOARDS */}
          <select
            name="board"
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
          >
            <option value="" disabled>
              Choose board
            </option>
            {usersBoards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name === "All Pins" ? "Profile" : `${board.name}`}
              </option>
            ))}
          </select>
          {/* <button onClick={handleAddToBoard}>Save</button> */}
          <FaHeart />
          <FaRegHeart />
        </div>
      )}
    </>
  );
}

export default PinComponent;
