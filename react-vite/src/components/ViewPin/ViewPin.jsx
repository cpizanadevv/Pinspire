import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPin } from '../../redux/pins';
import { createComment, updateComment, deleteComment } from '../../redux/comment';
import { createNewFavorite, deleteFavorite, getUserFavorites } from '../../redux/favorites';
import './ViewPin.css';

const ViewPin = () => {
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const pin = useSelector((state) => state.pinState.pin || {});
    // const comments = useSelector((state) => state.commentsState?.comments || {});
    const currentUser = useSelector((state) => state.session.user);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        dispatch(getPin(pinId));
        checkIfFavorite();
        // dispatch(getPinComments(pinId));
    }, [dispatch, pinId]);

    const checkIfFavorite = async () => {
        const favorites = await dispatch(getUserFavorites(currentUser.id));
        if (favorites && favorites.some(fav => fav.pin_id === parseInt(pinId))) {
            setIsFavorite(true);
        }
    };

    const toggleFavorite = async () => {
        if (!isFavorite) {
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            }, 150);
        }

        if (isFavorite) {
            await dispatch(deleteFavorite(pinId));
        } else {
            await dispatch(createNewFavorite(pinId));
        }

        setIsFavorite(!isFavorite);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const commentData = {
            comment: newComment,
            pinId: pinId,
        };

        const result = await dispatch(createComment(commentData));
        if (result && !result.errors) {
            setNewComment('');
            await dispatch(getPin(pinId));
        } else {
            console.error("Failed to submit comment:", result);
        }
    };

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setEditedComment(comment.comment);
    };

    const handleEditSubmit = async (e, commentId) => {
        e.preventDefault();
        if (editedComment.trim() === '') return;

        const updatedCommentData = {
            id: commentId,
            pinId: pinId,
            comment: editedComment,
        };

        const result = await dispatch(updateComment(updatedCommentData));
        if (result && !result.errors) {
            setEditingCommentId(null);
            await dispatch(getPin(pinId));
        } else {
            console.error("Failed to update comment:", result);
        }
    };

    const handleDeleteClick = (commentId) => {
        setCommentToDelete(commentId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (commentToDelete && pinId) {
            await dispatch(deleteComment(commentToDelete, pinId));
            setShowDeleteModal(false);
            setCommentToDelete(null);
            await dispatch(getPin(pinId));
        }
    };

    const comments = pin.comments || {};

    if (!pin) {
        return <div>Loading pin data...</div>;
    }

    return (
        <div className='view-pin-page'>
            <div className='pin-container'>
                <div className='left'>
                    <img src={pin.img_url} alt={pin.title} />
                </div>
                <div className='right'>
                    <div className='favorite-edit'>
                        {currentUser && (
                            <button
                                className={`favorite ${isFavorite ? 'favorited' : ''} ${isClicked ? 'clicked' : ''}`}
                                onClick={toggleFavorite}>
                                <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-star`}></i>
                            </button>
                        )}
                        {currentUser?.id === pin.user_id && (
                            <button className='edit-pin'><i className="fa-solid fa-pen-to-square"></i><span>Edit</span></button>
                        )}
                    </div>
                    <div className='info'>
                        <h2>{pin.title}</h2>
                        <p>{pin.description}</p>
                        {pin.link && <a href={pin.link} target="_blank" rel="noopener noreferrer">Visit Link</a>}
                    </div>
                    <div className='comment-container'>
                        <div className='comments'>
                            <div className='header'>
                                <span>
                                    {Object.keys(comments).length > 0
                                        ? `${Object.keys(comments).length} ${Object.keys(comments).length === 1 ? 'comment' : 'comments'}`
                                        : 'Comments'}
                                </span>
                            </div>
                            <div className='comments-section'>
                                {Object.keys(comments).length > 0 ? (
                                    Object.values(comments).map(comment => (
                                        <div className='individual-comment' key={comment.id}>
                                            {editingCommentId === comment.id ? (
                                                <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                                    <input
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        autoFocus
                                                    />
                                                    {editedComment.trim() !== '' && (
                                                        <button type="submit">Save</button>
                                                    )}
                                                    <button type="button" onClick={() => setEditingCommentId(null)}>Cancel</button>
                                                </form>
                                            ) : (
                                                <>
                                                    <div className="comment">
                                                        <h4 className='username'>{comment.username}</h4>
                                                        <span>{comment.comment}</span>
                                                    </div>
                                                    {comment.user_id === currentUser.id && (
                                                        <div className='options'>
                                                            <div className='buttons'>
                                                                <button className="edit-button" onClick={() => handleEditClick(comment)}>Edit</button>
                                                                <button className="delete-button" onClick={() => handleDeleteClick(comment.id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                            </div>
                        </div>
                        <div className='input-box'>
                            <form onSubmit={handleCommentSubmit}>
                                <input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder='Add a comment'
                                />
                                <button
                                    type="submit"
                                    className={newComment.trim() === '' ? 'inactive' : 'active'}
                                >
                                    <i className="fa-solid fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <div className="delete-modal">
                    <div className="delete-modal-content">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this comment?</p>
                        <div className="delete-modal-buttons">
                            <button onClick={handleDeleteConfirm}>Delete</button>
                            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ViewPin;
