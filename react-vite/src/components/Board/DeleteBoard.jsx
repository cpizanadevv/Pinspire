// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { putBoard, fetchOneBoard } from "../../redux/board";
import "./DeleteBoard.css";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "../../redux/board";
import { useModal } from "../../context/Modal";

const DeleteBoard = ({ boardId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const currUser = useSelector((state) => state.session.user);

    const handleDelete = () => {
        if (boardId) {
            dispatch(boardActions.destroyBoard(boardId)).then(() => {
                closeModal();
                navigate(`/${currUser.id}`);
            });
        } else {
            console.error("boardId not found");
        }
    };
    return (
        <div className="delete-board-modal-container">
            <h1 className="delete-board-modal-title">
                Are you sure you want to delete this board?
            </h1>
            <div className="delete-board-modal-buttons">
                <button
                    className="delete-board-modal-confirm"
                    onClick={handleDelete}
                >
                    Confirm
                </button>
                <button
                    className="delete-board-modal-cancel"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteBoard;
