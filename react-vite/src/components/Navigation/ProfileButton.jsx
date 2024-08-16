import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
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
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <OpenModalMenuItem
            itemText="Log In"
            onItemClick={() => {}}
            modalComponent={<LoginFormModal />}
          />
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
