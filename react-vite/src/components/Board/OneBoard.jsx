import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBoard } from "../../redux/board";
import "./OneBoard.css";
import { useParams } from "react-router-dom";

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
        <div id='one-board-container'>
            <ul className='one-board'>
                <li>{board.name}</li>
            </ul>
            <ul className="pins-container">
                {boardPins.length > 0 ? (
                    boardPins.map(pin => (
                        <li key={pin.id}>
                            <img
                                src={pin.img_url}
                                alt={pin.title}
                            />
                            <div className='edit-delete-container'>
                                <button className='delete-button'>Edit</button>
                                <button className='keep-button'>Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No pins available for this board.</li>
                )}
            </ul>
        </div>
    );
}

export default OneBoard;
