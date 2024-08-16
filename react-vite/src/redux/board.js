const GET_BOARDS = "board/getBoard";
const GET_ONE_BOARD = "board/getOneBoard";
const POST_BOARD = "board/postBoard";
const EDIT_BOARD = "board/editBoard";
const DELETE_BOARD = "board/deleteBoard";
// const POST_BOARD_PIN = "board/postBoardPin";
const DELETE_BOARD_PIN = "board/deleteBoardPin";

const getBoards = (boards) => {
    return {
        type: GET_BOARDS,
        boards,
    };
};

const getOneBoard = (board) => {
    return {
        type: GET_ONE_BOARD,
        board,
    };
};

const createBoard = (board) => {
    return {
        type: POST_BOARD,
        board,
    };
};

const editBoard = (board) => {
    return {
        type: EDIT_BOARD,
        board,
    };
};

const deleteBoard = (boardId) => {
    return {
        type: DELETE_BOARD,
        payload: { boardId },
    };
};

// export const addPinToBoard = (boardId, pin) => ({
//     type: POST_BOARD_PIN,
//     payload: { boardId, pin }
// });

export const removePinFromBoard = (boardId, pin) => ({
    type: DELETE_BOARD_PIN,
    payload: { boardId, pin }
});

export const postBoardPin = (boardId, pinId) => async () => {
    const response = await fetch(`/api/boards/${boardId}/pins/${pinId}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const pin = await response.json();
        return pin
        // dispatch(addPinToBoard(boardId, pin));
    } else {
        const error = await response.json();
        console.error("Failed to add pin:", error);
    }
};

export const deleteBoardPin = (boardId, pinId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}/pins/${pinId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const pin = await response.json();
        dispatch(removePinFromBoard(boardId, pin));
    } else {
        const error = await response.json();
        console.error("Failed to delete pin:", error);
    }
};

export const fetchAllBoards = () => async (dispatch) => {
    const response = await fetch("/api/boards");

    if (response.ok) {
        const data = await response.json();

        dispatch(getBoards(data));

        return data;
    }
};

export const fetchOneBoard = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`);

    if (response.ok) {
        const data = await response.json();

        dispatch(getOneBoard(data));

        return data;
    }
};

export const postBoard = (board) => async (dispatch) => {
    const response = await fetch("/api/boards/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
        credentials: "include",
    });

    console.log("RESPONSE RESPONSE", response);
    if (response.ok) {
        const newBoard = await response.json();
        dispatch(createBoard(newBoard));

        return newBoard;
    } else {
        const error = await response.json();

        return error;
    }
};

export const putBoard = (board, boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board),
        credentials: "include",
    });

    if (response.ok) {
        const editedBoard = await response.json();
        dispatch(editBoard(editedBoard.board));

        return editedBoard;
    }
};

export const destroyBoard = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteBoard(boardId));
    }
};

const initialState = {};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARDS: {
            const newState = { ...state };
            action.boards.forEach((board) => {
                newState[board.id] = board;
            });
            return newState;
        }
        case GET_ONE_BOARD: {
            return {
                ...state,
                [action.board.id]: action.board,
            };
        }
        case POST_BOARD: {
            return {
                ...state,
                [action.board.id]: action.board,
            };
        }
        case EDIT_BOARD: {
            return {
                ...state,
                [action.board.id]: action.board,
            };
        }
        // Other cases
        case DELETE_BOARD: {
            const newState = { ...state };
            delete newState[action.payload.boardId];
            return newState;
        }
        // case POST_BOARD_PIN: {
        //     const { boardId, pin } = action.payload;
        //     if (state[boardId]) {
        //         const updatedBoard = {
        //             ...state[boardId],
        //             pins: [...state[boardId].pins, pin],
        //         };
        //         return {
        //             ...state,
        //             [boardId]: updatedBoard,
        //         };
        //     }
        //     return state;
        // }
        case DELETE_BOARD_PIN: {
            const { boardId, pin } = action.payload;
            if (state[boardId]) {
                const updatedBoard = {
                    ...state[boardId],
                    pins: state[boardId].pins.filter((p) => p.id !== pin.id),
                };
                return {
                    ...state,
                    [boardId]: updatedBoard,
                };
            }
            return state;
        }
        default:
            return state;
    }
};

export default boardReducer;
