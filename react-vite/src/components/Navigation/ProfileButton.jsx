import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaAngleDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      {user ? (
        <div className="profile-menu">
          <NavLink to={`/${user.id}`}>
            <FaUserCircle />
          </NavLink>

          <button onClick={toggleMenu}>
            <FaAngleDown />
          </button>
          {showMenu && (
            <ul className="profile-dropdown" ref={ulRef}>
              <div className="dropdown-content">
                <li>{user.username}</li>
                <li>{user.email}</li>
                <li>
                  <button onClick={logout}>Log Out</button>
                </li>
              </div>
            </ul>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <div className="login">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={() => {}}
              modalComponent={<LoginFormModal />}
            />
          </div>

          <div className="sign-up">
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={() => {}}
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
