import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import "./ProfilePage.css";
import { getAllPins } from "../../redux/pins";


const Profile = () => {
    const user = useSelector((state) => state.session.user);
    const pinsObj = useSelector((state) => state.pinState.pins)
    const pins = Object.values(pinsObj)
    const userPins = pins.filter((pin) => pin.user_id == user.id)
    // console.log(userPins)

    
    const [activeTab, setActiveTab] = useState('saved');
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userId } = useParams()

    
    useEffect(() => {
        if (!user || user.id !== +userId) {
            navigate('/');
        }
    }, [user, userId, navigate]);

    useEffect(() => {
        dispatch(getAllPins())
    }, [dispatch])

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
                {activeTab === 'created' && 
                    <div className="created-grid">
                        {userPins.map((pin) => (
                            <div key={pin.id} className="profile-pin-container">
                                <img src={pin.img_url} />
                                <div className="profile-image-overlay">
                                    <button className="save-button">Save</button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {activeTab === 'saved' && <div>Saved place holder.</div>}
                {activeTab === 'favorites' && <div>Favorites place holder</div>}
            </div>
        </div>
    );
};

export default Profile;
