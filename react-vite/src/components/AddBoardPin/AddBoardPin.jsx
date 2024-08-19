import * as pinActions from "../../redux/pins";
import { useEffect, useState } from "react";
import "./AddBoardPin.css";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "../../redux/board";

const AddBoardPin = ({ pinId }) => {
    const dispatch = useDispatch();

    const currentUserId = useSelector((state) => state.session.user?.id);
    const boards = useSelector((state) => state.boardState);
    const boardsObj = Object.values(boards);
    const pin = useSelector((state) => state.pinState.pin);

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

    const handleTogglePinOnBoard = (boardId) => {
        if (savedBoards.has(boardId)) {
            // If the pin is already saved to this board, remove it
            dispatch(boardActions.deleteBoardPin(boardId, pinId)).then(() => {
                setSavedBoards((prevSavedBoards) => {
                    const newSavedBoards = new Set(prevSavedBoards);
                    newSavedBoards.delete(boardId);
                    return newSavedBoards;
                });
            });
        } else {
            // If the pin is not saved to this board, add it
            dispatch(boardActions.postBoardPin(boardId, pinId)).then(() => {
                setSavedBoards((prevSavedBoards) => {
                    const newSavedBoards = new Set(prevSavedBoards);
                    newSavedBoards.add(boardId);
                    return newSavedBoards;
                });
            });
        }
    };

    return (
        <div className="add-board-pin-container">
            <img src={pin.img_url} alt="Pin Image" id="board-pin-image" />
            <div className="board-list">
                <h2>Select a board to save this pin</h2>
                <div className="board-button-container">
                    {userBoards.map((board) => (
                        <div className="board-button" key={board.id}>
                            {board.name}
                            <button
                                className={`save-button ${savedBoards.has(board.id) ? "saved" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTogglePinOnBoard(board.id);
                                }}
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
