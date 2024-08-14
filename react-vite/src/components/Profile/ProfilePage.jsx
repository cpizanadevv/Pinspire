import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import "./ProfilePage.css";


const Profile = () => {
    const user = useSelector((state) => state.session.user);

    const [activeTab, setActiveTab] = useState('saved');

    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        if (!user || user.id !== +userId) {
            navigate('/');
        }
    }, [user, userId, navigate]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div id="profile-page-container">
            <div id="profile-top-container">
                <div id="profile-user-container">
                    <span id="profile-picture">{user.last_name[0]}</span>
                    <h1>{user.first_name} {user.last_name}</h1>
                    <p>{user.username}</p>
                    <div className="profile-buttons">
                        <button>Share</button>
                        <button> Edit profile</button>
                    </div>
                </div>
                <div className="profile-links">
                    <div className={activeTab === 'created' ? 'active' : ''}
                    onClick={() => handleTabChange('created')}>
                        Created
                    </div>
                    <div className={activeTab === 'saved' ? 'active' : ''}
                    onClick={() => handleTabChange('saved')}>
                        Saved
                    </div>
                    <div className={activeTab === 'favorites' ? 'active' : ''}
                    onClick={() => handleTabChange('favorites')}>
                        Favorites
                    </div>
                </div>
            </div>
            <div id="profile-bottom-container">
                {activeTab === 'created' && <div>Created place holder.</div>}
                {activeTab === 'saved' && <div>Saved place holder.</div>}
                {activeTab === 'favorites' && <div>Favorites place holder</div>}
            </div>
        </div>
    );
};

export default Profile;
