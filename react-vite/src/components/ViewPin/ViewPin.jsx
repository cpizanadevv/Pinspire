import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPin } from '../../redux/pins';
import { createComment, updateComment, deleteComment } from '../../redux/comment';
import { createNewFavorite, deleteFavorite, getUserFavorites } from '../../redux/favorites';
import Notification from '../Notification/Notification';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditPin from '../EditPin/EditPin';
import AddBoardPin from "../AddBoardPin/AddBoardPin";
import './ViewPin.css';

const ViewPin = () => {
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const pin = useSelector((state) => state.pinState.pin || {});
    const currentUser = useSelector((state) => state.session.user);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    useEffect(() => {
        dispatch(getPin(pinId));
        checkIfFavorite();
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
            showNotificationMessage('Pin removed from favorites!');
        } else {
            await dispatch(createNewFavorite(pinId));
            showNotificationMessage('Pin added to favorites!');
        }

        setIsFavorite(!isFavorite);
    };

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
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

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const renderDescription = () => {
        if (!pin.description) {
            return '';
        }

        if (isDescriptionExpanded || pin.description.length <= 60) {
            return pin.description;
        }
        return pin.description.slice(0, 50) + ' ...';
    };

    const getAuthorName = () => {
        if (pin.user_id && currentUser?.id === pin.user_id) {
            return currentUser.username;
        }
        if (pin.description && pin.description.startsWith("Photo by")) {
            const author = pin.description.split("by")[1].trim();
            return author || 'Unknown';
        }
        return 'Unknown';
    };

    const comments = pin.comments || {};

    if (!pin) {
        return <div>Loading pin data...</div>;
    }

    const renderComments = () => {
        if (!comments || Object.keys(comments).length === 0) {
            return <p>No comments yet.</p>;
        }

        return Object.values(comments)
            .filter(comment => comment && comment.id)
            .map(comment => {
                if (!comment) return null;

                return (
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
                                {comment.user_id === currentUser?.id && (
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
                );
            });
    };

    return (
        <div className='view-pin-page'>
            <Notification message={notificationMessage} show={showNotification} />
            <div className='pin-container'>
                <div className='left'>
                    <OpenModalButton
                        buttonText="Save"
                        modalComponent={<AddBoardPin />}
                        className="landing-save-button"
                        pinId={pin.id}
                    />
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
                        {/* {currentUser?.id === pin.user_id && (
                            <button className='edit-pin' onClick={openEditModal}>
                                <i className="fa-solid fa-pen-to-square"></i>
                                <span>Edit</span>
                            </button>
                        )} */}
                        {pin.id && currentUser?.id === pin.user_id && (
                            <OpenModalButton
                                buttonText={<><i className="fa-solid fa-pen-to-square"></i><span>Edit</span></>}
                                modalComponent={<EditPin />}
                                className="edit-pin"
                                pinId={pin.id}
                            />
                        )}
                    </div>
                    <div className='info'>
                        <h2>{pin.title}</h2>
                        <p className='author'>{getAuthorName()}</p>
                        <p
                            className='description-line'
                            onClick={pin.description && pin.description.length > 60 ? toggleDescription : undefined}
                            style={{ cursor: pin.description && pin.description.length > 60 ? 'pointer' : 'default' }}
                        >
                            {renderDescription()}
                        </p>
                        {pin.link && <a className='link-line' href={pin.link} target="_blank" rel="noopener noreferrer">Visit Link</a>}
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
                                {renderComments()}
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className="tooltip-container">
                                <form onSubmit={handleCommentSubmit}>
                                    <input
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder='Add a comment'
                                        disabled={!currentUser}
                                        style={{ color: !currentUser ? 'lightgray' : 'inherit' }}
                                    />
                                    <button
                                        type="submit"
                                        className={newComment.trim() === '' ? 'inactive' : 'active'}
                                        disabled={!currentUser}
                                    >
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                </form>
                                {!currentUser && (
                                    <span className="tooltip-text">Sign in to comment!</span>
                                )}
                            </div>
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
