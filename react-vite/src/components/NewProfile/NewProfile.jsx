import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import './NewProfile.css';

const NewProfile = () => {
    const user = useSelector((state) => state.session.user);

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        if (!user || user.id !== +userId) {
            navigate("/");
        }
    }, [user, userId, navigate]);

    return (
        <div id="profile-page-container">
            <div id="profile-top-container">
                <div id="profile-user-container">
                    <span id="profile-picture">{user.last_name[0]}</span>
                    <h1>
                        {user.first_name} {user.last_name}
                    </h1>
                    <p>{user.username}</p>
                    <div className="profile-buttons">
                        <button>Share</button>
                        <button>Edit profile</button>
                    </div>
                </div>
                <div className="profile-links">
                    <NavLink to={`/${userId}/created`} className={({ isActive }) => (isActive ? 'active' : '')}>
                        Created
                    </NavLink>
                    <NavLink to={`/${userId}/saved`} className={({ isActive }) => (isActive ? 'active' : '')}>
                        Saved
                    </NavLink>
                    <NavLink to={`/${userId}/favorites`} className={({ isActive }) => (isActive ? 'active' : '')}>
                        Favorites
                    </NavLink>
                </div>
            </div>
            <div className="profile-bottom-container">
                <Outlet />
            </div>
        </div>
    );
};

export default NewProfile;
