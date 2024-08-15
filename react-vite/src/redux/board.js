const GET_BOARDS = "board/getBoard"
const GET_ONE_BOARD = "board/getOneBoard"
const POST_BOARD = "board/postBoard"
const EDIT_BOARD = "board/editBoard"
const DELETE_BOARD = "board/deleteBoard"

const getBoards = (boards) => {
    return {
        type: GET_BOARDS,
        boards
    }
}

const getOneBoard = (board) => {
    return {
        type: GET_ONE_BOARD,
        board
    }
}

const createBoard = (board) => {
    return {
        type: POST_BOARD,
        board
    }
}

const editBoard = (board) => {
    return {
        type: EDIT_BOARD,
        board
    }
}

const deleteBoard = (boardId) => {
    return {
        type: DELETE_BOARD,
        boardId
    }
}
export const fetchAllBoards = () => async (dispatch) => {
    const response = await fetch("/api/boards")

    if (response.ok) {
        const data = await response.json();

        dispatch(getBoards(data))

        return data
    }
}

export const fetchOneBoard = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${spotId}`)

    if (response.ok) {
        const data = await response.json();

        dispatch(getOneBoard(data));

        return data
    }
}

export const postBoard = (board) => async (dispatch) => {
    const response = await fetch('/api/boards', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(board)
    });

    console.log("RESPONSE RESPONSE", response)
    if (response.ok) {
        const newBoard = await response.json();
        dispatch(createBoard(newBoard));

        return newBoard
    }
    else {
        const error = await response.json()

        return error
    }
}


export const putBoard = (board, boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(board)
    })

    if (response.ok) {
        const editedBoard = await response.json()
        dispatch(editBoard(editedBoard))

        return editedBoard
    }

}

export const destroyBoard = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteBoard(boardId))
    }
}

const initialState = {}

const boardReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_BOARDS: {
            const newState = { ...state};
            action.boards.forEach(board => {
                newState[board.id] = board;
            })
            return newState
        }
        case GET_ONE_BOARD: {
            return {
                ...state,
                [action.board.id]: action.board
            }
        }
        case POST_BOARD: {
            return {
                ...state,
                [action.board.id]: action.board
            }
        }
        case EDIT_BOARD: {
            return {
                ...state,
                [action.board.id]: action.board
            }
        }
        case DELETE_BOARD: {
            const newState = { ...state };
            delete newState[action.boardId];
            return newState
        }
        default: return state;
    }
}

export default boardReducer
