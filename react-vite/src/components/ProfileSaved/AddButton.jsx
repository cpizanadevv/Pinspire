import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateBoard from "../Board/CreateBoard"

function AddButton() {
  const [showMenu, setShowMenu] = useState(false);
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

  return (
    <>
        <button onClick={toggleMenu} className="profile-saved-button">
            <FaPlus style={{fontSize:'22px'}}/>
        </button>
        {showMenu && (
            <div className="profile-saved-menu" ref={ulRef}>
                <div className="profile-saved-dropdown">
                    <p>Create</p>
                    <div className="profile-saved-dropdown-options">
                        <NavLink to={'/create'}>Pin</NavLink>
                        <OpenModalButton 
                            buttonText="Board"
                            modalComponent={<CreateBoard />}
                            className="profile-saved-create-button"
                        />
                    </div>
                </div>
            </div>
        )}
    </>
  );
}

export default AddButton;
