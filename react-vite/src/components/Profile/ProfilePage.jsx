import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ProfilePage.css";
import { getAllPins } from "../../redux/pins";
import { fetchAllBoards } from "../../redux/board"
import EditPin from "../EditPin/EditPin";


const Profile = () => {
    const user = useSelector((state) => state.session.user);
    const pinsObj = useSelector((state) => state.pinState.pins)
    const boardsObj = useSelector((state => state.boardState))
    const pins = Object.values(pinsObj)
    const boards = Object.values(boardsObj)
    const userPins = pins.filter((pin) => pin.user_id == user.id)
    const userBoards = boards.filter((board) => board.user_id == user.id)
    // console.log(userBoards)
    
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
        dispatch(fetchAllBoards())
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
            <div className="profile-middle-container">
                <button>
                    <i className="fa-solid fa-sort"></i>
                </button>
                <button>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div id="profile-bottom-container">

                {activeTab === 'created' && 
                    <div className="created-grid">
                        {userPins.map((pin) => (
                            <div key={pin.id} className="profile-pin-container">
                                <img src={pin.img_url} />
                                <div className="profile-image-overlay">
                                    <p className="profile-overlay-text">Profile</p>
                                    <button className="save-button">Save</button>
                                    <OpenModalButton
                                        buttonText="Edit"
                                        modalComponent={<EditPin />}
                                        className="profile-edit-button"
                                        pinId={pin.id}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {activeTab === 'saved' && 
                    <div className="profile-board-grid">
                        {userBoards.map((board) => (
                            <NavLink key={board.id} to={`/boards/${board.id}`}>
                                <div className="profile-board-container">
                                    <div className="profile-board-image-container">
                                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWxpmv4OBwxwBby4Xyv4FO7m1t1mTSAzrsQ&s"/> */}
                                        <button className="profile-board-edit-button">Edit</button>
                                    </div>
                                    <div className="profile-board-title-container">
                                        <p className="profile-board-title">{board.name}</p>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                }

                {activeTab === 'favorites' && <div>Favorites place holder</div>}
            </div>
        </div>
    );
};

export default Profile;
