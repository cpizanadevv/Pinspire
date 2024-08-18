export const getComments = (comments) => ({
    type: 'GET_COMMENTS',
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
    const response = await fetch(`/api/pins/${pinId}/comments`);
    if (response.ok) {
        const comments = await response.json();
        console.log('Fetched comments:', comments);
        dispatch(getComments(comments.comments));
        return comments;
    } else {
        const error = await response.json();
        console.error('Error fetching comments:', error);
        return error;
    }
}

export const createComment = (commentData) => async (dispatch, getState) => {
    const response = await fetch(`/api/pins/${commentData.pinId}/new-comment`, {
        method: "POST",
        body: JSON.stringify({ comment: commentData.comment }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const newComment = await response.json();
        const state = getState();
        const pin = state.pinState.pin || {};

        const updatedPin = {
            ...pin,
            comments: {
                ...pin.comments,
                [newComment.id]: newComment
            }
        };

        dispatch({
            type: 'LOAD_PIN',
            pin: updatedPin,
        });
        return newComment;
    } else {
        const error = await response.json();
        console.error('Error creating comment:', error);
        return error;
    }
};


export const updateComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/pins/${comment.pinId}/${comment.id}/edit`, {
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
    const response = await fetch(`/api/pins/${comment.pinId}/${comment.id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeComment(comment.id))
    } else {
        const error = await response.json()
        return error
    }
}


const initialState = { comments: {} }

function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_COMMENTS':
            return {
                ...state,
                comments: action.comments || {},
            };
        case 'SET_COMMENT':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.id]: action.comment,
                },
            };
        case 'REMOVE_COMMENT':
            const { [action.commentId]: _, ...remainingComments } = state.comments;
            return {
                ...state,
                comments: remainingComments,  // Remove the comment by filtering out its key
            };
        default:
            return state;
    }
}

export default commentsReducer;
