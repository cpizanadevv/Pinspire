import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBoard } from "../../redux/board";
import "./OneBoard.css";
import { useParams } from "react-router-dom";

const OneBoard = () => {
    const { boardId } = useParams();

    const dispatch = useDispatch();
    const boardObj = useSelector((state) => state.boardState);
    const board = Object.values(boardObj)[0]

    useEffect(() => {
        dispatch(fetchOneBoard(boardId))
    }, [dispatch, boardId])


    if (!board) return <h1>Loading...</h1>;

    return (
        <div id='one-board-container'>
            <ul className='one-board'>
                <li>{board.name}</li>
            </ul>
        </div>
    )
}

export default OneBoard
