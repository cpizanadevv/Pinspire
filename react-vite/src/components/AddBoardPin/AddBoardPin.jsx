import * as pinActions from "../../redux/pins";
import { useEffect, useState } from "react";
import "./AddBoardPin.css";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as boardActions from "../../redux/board";

const AddBoardPin = ({ pinId, onSelectBoard }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const currentUserId = useSelector((state) => state.session.user?.id);
    const boards = useSelector((state) => state.boardState);
    const boardsObj = Object.values(boards);
    const pin = useSelector((state) => state.pinState.pin);

    console.log('AAAAAAAAAAAA', pin)
    const [savedBoards, setSavedBoards] = useState(new Set());

    useEffect(() => {
        dispatch(pinActions.getPin(pinId));
    }, [dispatch, pinId]);

    useEffect(() => {
        if (pin && pin.boards) {
            const savedBoardsSet = new Set(pin.boards.map((board) => board.id));
            setSavedBoards(savedBoardsSet);
        }
    }, [pin]);

    const userBoards = boardsObj.filter(
        (board) => board.user_id === currentUserId
    );

    const handleSavePinToBoard = (boardId) => {
        dispatch(boardActions.postBoardPin(boardId, pinId)).then(() => {
            setSavedBoards((prevSavedBoards) =>
                new Set(prevSavedBoards).add(boardId)
            );
        });
    };

    return (
        <div className="add-board-pin-container">
            <img src={pin.img_url} alt="Pin Image" id="board-pin-image" />
            <div className="board-list">
                <h2>Select a board to save this pin:</h2>
                <div className="board-button-container">
                    {userBoards.map((board) => (
                        <div className="board-button" key={board.id}>
                            {board.name}
                            <button
                                className="save-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSavePinToBoard(board.id);
                                }}
                                disabled={savedBoards.has(board.id)}
                            >
                                {savedBoards.has(board.id) ? "Saved" : "Save"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddBoardPin;
