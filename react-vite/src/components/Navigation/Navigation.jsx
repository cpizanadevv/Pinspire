import { NavLink, useNavigate } from "react-router-dom";
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
            <NavLink to="/">Home</NavLink>
            {user && (
              <li>
                <NavLink to="">Create</NavLink>
              </li>
            )}
          </div>
        </li>

        <li>
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
