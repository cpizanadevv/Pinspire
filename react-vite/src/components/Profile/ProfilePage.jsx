import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProfilePage.css";
import { NavLink } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.session.user);
    console.log("stuff", user);

    return (
        <div>
            <div id="user-container">
                <h1>
                    {user.first_name} {user.last_name}
                </h1>
                <p>{user.username}</p>
            </div>
        </div>
    );
};

export default Profile;
