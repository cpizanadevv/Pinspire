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


    // Early return if user is null or undefined
    if (!user) {
        return null; // or a loading spinner, or redirect, etc.
    }

    return (
        <div id="profile-page-container">
            <div id="profile-top-container">
                <div id="profile-user-container">
                    <span id="profile-picture">{user.first_name[0].toUpperCase()}</span>
                    <h1 className="profile-page-name">
                        {user.first_name} {user.last_name}
                    </h1>
                    <div className="profile-username-container">
                        <img src="../../../pinspire_small.png"/>
                        <p className="profile-page-username">{user.username}</p>
                    </div>
                </div>
                <div className="profile-links">
                    <NavLink to={`/${userId}/created`} className={({ isActive }) => (isActive ? 'active' : '')}>
                        Created
                    </NavLink>
                    <NavLink to={`/${userId}/saved`} className={({ isActive }) => (isActive ? 'active' : '')}>
                        Boards
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
