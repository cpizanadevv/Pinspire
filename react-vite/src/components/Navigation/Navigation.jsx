import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <>
      <ul>
        <li>
          <div className="left-nav">
            <img className="logo" src='../../../pinspire_logo.png'/>
            <NavLink className='home-button'to="/">Home</NavLink>
            {user && (
              <li>
                <NavLink className='create-button' to="/create">Create</NavLink>
              </li>
            )}
          </div>
        </li>

        <li className="search-bar">
          <SearchComponent/>
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul>
    </>
  );
}

export default Navigation;
