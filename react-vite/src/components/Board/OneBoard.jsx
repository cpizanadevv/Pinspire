import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBoard } from "../../redux/board";
import "./OneBoard.css";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteModal from "./RemovePinModal";
import PutBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";

const OneBoard = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();

    // Access the board directly by its ID
    const board = useSelector((state) => state.boardState[boardId]);

    useEffect(() => {
        dispatch(fetchOneBoard(boardId));
    }, [dispatch, boardId]);

    const boardPins = board?.pins || [];

    if (!board || !board.name || !boardPins) return;
    <div className="loader-container">
        <Loader />
    </div>;

    return (
        <div id="one-board-container">
            <div className="one-board-header">
                <div className="one-board-name">
                    <h1>{board.name}</h1>
                    <p>{board.description}</p>
                </div>
                <div className="edit-board-modal-container">
                    <OpenModalButton
                        buttonText="Edit Board"
                        modalComponent={<PutBoard />}
                        className="edit-board-button"
                        boardId={boardId}
                    />
                    <OpenModalButton
                        buttonText="Delete Board"
                        modalComponent={<DeleteBoard />}
                        className="delete-board-button"
                        boardId={boardId}
                    />
                </div>
            </div>
            <div className="pins-container">
                <div className="created-grid">
                    {boardPins.length > 0 ? (
                        boardPins.map((pin) => (
                            <div key={pin.id} className="profile-pin-container">
                                <NavLink to={`/pin/${pin.id}`}>
                                    <img src={pin.img_url} alt={pin.title} />
                                    <div className="profile-image-overlay">
                                        <OpenModalButton
                                            buttonText="Remove"
                                            modalComponent={<DeleteModal />}
                                            className="delete-pin-modal-button"
                                            pinId={pin.id}
                                            boardId={boardId}
                                        />
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        <div className="created-grid-home-link">
                            <NavLink to="/">
                                Visit Home to browse for pins!
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OneBoard;
