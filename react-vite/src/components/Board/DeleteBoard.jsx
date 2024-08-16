import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { putBoard, fetchOneBoard } from "../../redux/board";
import "./EditBoard.css";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "../../redux/board";
import { useModal } from "../../context/Modal";

const DeleteBoard = ( {boardId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const currUser = useSelector(state => state.session.user)

    const handleDelete = () => {
        if (boardId) {
            dispatch(boardActions.destroyBoard(boardId)).then(() => {
                closeModal();
                navigate(`/${currUser.id}`)
            })


        } else {
            console.error("boardId not found")
        }
    }
        return <div>
            <h1>Are you sure you want to delete this board?</h1>
            <button onClick={handleDelete}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
}

export default DeleteBoard
