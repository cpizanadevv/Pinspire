import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBoards } from "../../redux/board";
import "./BoardPage.css";
import { NavLink } from "react-router-dom";

const Boards = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boardState);
    const boardsObject = Object.values(boards);
    const user = useSelector((state) => state.session.user);

    console.log('AAAAAAAAAAAAA', boardsObject)
    useEffect(() => {
        dispatch(fetchAllBoards());
    }, [dispatch]);

    const userBoards = boardsObject.filter(
        (board) =>
        {
            board.user_id === user.id
        }
    );

    console.log('BBBBBBBBB', userBoards)
    return (
        <div id="boards-container">
            <div className="user-board">
                <h2>Board belonging to user</h2>
                {userBoards.map((board) => (
                    <li id="board-item" key={board.id}>
                        <ul>{board.name}</ul>
                        <ul></ul>
                    </li>
                ))}
            </div>
            <div className="all-boards">
                <h2>All boards</h2>
                {boardsObject.map((board) => (
                    <li id="board-item" key={board.id}>
                        <ul>{board.name}</ul>
                        <ul></ul>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default Boards;
