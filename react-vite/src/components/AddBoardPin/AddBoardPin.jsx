import * as boardActions from "../../redux/board";
import * as pinActions from "../../redux/pins";
import { useEffect, useState } from "react";
import "./AddBoardPin.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';

const AddBoardPin = ({ pinId, onSelectBoard }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const currentUserId = useSelector((state) => state.session.user?.id);
    const boards = useSelector((state) => state.boardState);
    const boardsObj = Object.values(boards);
    const pin = useSelector((state) => state.pinState.pin);

    useEffect(() => {
        dispatch(pinActions.getPin(pinId));
    }, [dispatch, pinId]);

    const userBoards = boardsObj.filter(
        (board) => board.user_id === currentUserId
    );

    const handleSelectBoard = (boardId) => {
        // Pass both boardId and pinId to the parent component
        onSelectBoard(boardId, pinId);
        closeModal();
    };

    return (
        <div className="add-board-pin-container">
            <img src={pin.img_url} alt="Pin Image" id="board-pin-image" />
            <div className="board-list">
                <h2>Select a board to save this pin:</h2>
                <div className="board-button-container">
                    {userBoards.map((board) => (
                        <button
                            key={board.id}
                            onClick={() => handleSelectBoard(board.id)}
                        >
                            {board.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddBoardPin;
