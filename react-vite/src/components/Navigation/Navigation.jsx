import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <>
      <ul className="navigation-list">
        <li className="left-nav">
            {/* <img className="logo-png" src='../../../pinspire_logo.png' alt="Logo" />
          <NavLink className='home-button' to="/">Home</NavLink>
          {user && (
            <NavLink className='create-button' to="/create">Create</NavLink>
          )} */}
          {user ? (
            <>
            <img className="short-logo-png" src='../../../pinspire_logo.png' alt="Short Logo" />
            <NavLink className='home-button' to="/">Home</NavLink>
            <NavLink className='create-button' to="/create">Create</NavLink>
            </>
          ) : (
            <NavLink className='long-logo' to='/'>
              <img className="long-logo-png" src='../../../pinspire_long_logo.png' alt="Long Logo" />
            </NavLink>
          )}

        </li>

        <li className="search-bar">
          <SearchComponent />
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul>
    </>
  );
}

export default Navigation;
