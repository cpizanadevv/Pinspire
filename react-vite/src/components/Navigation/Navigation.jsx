import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import {useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <>{user ? (
      <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to=''>Create</NavLink>
      </li>

      <li>
        <input className="search" type="text" placeholder="Search" />
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
    ):
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <input className="search" type="text" placeholder="Search" />
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
    
    }

    </>
    
  );
}

export default Navigation;
