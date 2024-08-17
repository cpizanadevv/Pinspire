import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";

// function Navigation() {
//   const user = useSelector((store) => store.session.user);
//   return (
//     <>
//       <ul>
//         <li>
//           <div className="left-nav">
//             <NavLink className='logo' to='/'>
//               <img className="logo-png" src='../../../pinspire_logo.png'/>
//             </NavLink>
//             <NavLink className='home-button'to="/">Home</NavLink>
//             {user && (
//               <li>
//                 <NavLink className='create-button' to="/create">Create</NavLink>
//               </li>
//             )}
//           </div>
//         </li>

//         <li className="search-bar">
//           <SearchComponent/>
//         </li>

//         <li>
//           <ProfileButton />
//         </li>
//       </ul>
//     </>
//   );
// }

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <>
      <ul className="navigation-list">
        <li className="left-nav">
          <NavLink className='logo' to='/'>
            <img className="logo-png" src='../../../pinspire_logo.png' alt="Logo" />
          </NavLink>
          <NavLink className='home-button' to="/">Home</NavLink>
          {user && (
            <NavLink className='create-button' to="/create">Create</NavLink>
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
