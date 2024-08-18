import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPin } from '../../redux/pins';
import { createComment } from '../../redux/comment';
import './ViewPin.css';

const ViewPin = () => {
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const pin = useSelector((state) => state.pinState.pin || {});
    // const comments = useSelector((state) => state.commentsState?.comments || {});
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        dispatch(getPin(pinId));
        // dispatch(getPinComments(pinId));
    }, [dispatch, pinId]);

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
                    <div className='info'>
                        <h2>{pin.title}</h2>
                        <p>{pin.description}</p>
                        {pin.link && <a href={pin.link} target="_blank" rel="noopener noreferrer">Visit Link</a>}
                    </div>
                    <div className='comment-container'>
                        <div className='comments'>
                            <div className='header'><span>Comments</span></div>
                            <div className='comments-section'>
                                {Object.keys(comments).length > 0 ? (
                                    Object.values(comments).map(comment => (
                                        <div key={comment.id} className="comment">
                                            {comment.comment}
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className='comment-count'>
                                {Object.keys(comments) ? `${Object.keys(comments).length} comments` : 'No comments yet'}
                            </div>
                            <form onSubmit={handleCommentSubmit}>
                                <input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder='Add a comment'
                                />
                                <button type="submit">Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ViewPin;
