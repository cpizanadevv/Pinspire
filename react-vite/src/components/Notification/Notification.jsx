import './Notification.css';

const Notification = ({ message, show }) => {
    return (
        <div className={`notification-container ${show ? 'show' : ''}`}>
            {message}
        </div>
    );
};

export default Notification;
