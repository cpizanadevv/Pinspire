
export const getComments = (comments) => ({
    type:  'GET_COMMENTS',
    comments
});
export const setComment = (comment) => ({
    type: 'SET_COMMENT',
    comment
});
export const removeComment = (commentId) => ({
    type: 'REMOVE_COMMENT',
    commentId
});


export const getPinComments = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}/comments`)
    if (response.ok) {
        const comments  = await response.json();
        dispatch(getComments(comments.comments))
        return comments
    } else {
        const error = await response.json()
        return error
    }
}

export const createComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/pins/${comment.pinId}/new-comment`,{
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const newComment = await response.json();
        dispatch(setComment(newComment))
        return newComment
    } else {
        const error = await response.json()
        return error
    }
}

export const updateComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/pins/${comment.pinId}/${comment.id}/edit`,{
        method: "PUT",
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const newComment = await response.json();
        dispatch(setComment(newComment))
        return newComment
    } else {
        const error = await response.json()
        return error
    }
}

export const deleteComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/pins/${comment.pinId}/${comment.id}`,{
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeComment(comment.id))
    } else {
        const error = await response.json()
        return error
    }
}


const initialState = {}

function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_COMMENTS':
            return {
                ...state,
                comments: action.comments,
            };
        case 'SET_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.comment],
            };
        case 'REMOVE_COMMENT':
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.commentId),
            };
        default:
            return state;
    }

}
export default commentsReducer;