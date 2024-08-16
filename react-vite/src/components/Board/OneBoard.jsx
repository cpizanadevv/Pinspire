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
    const board = Object.values(boardObj)[0] || {}; // Default to empty object if undefined

    useEffect(() => {
        dispatch(fetchOneBoard(boardId));
    }, [dispatch, boardId]);

    // Ensure `board` and `board.pins` are defined
    const boardPins = board.pins || [];

    if (!board || !board.name) return <h1>Loading...</h1>;

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
                                        modalComponent={
                                            <DeleteModal
                                                boardId={boardId}
                                                pinId={pin.id}
                                            />
                                        }
                                        className="save-button"
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
