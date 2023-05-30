//Navigation Component
import React, { useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import SearchForm from "../hooks/SearchForm"
// import PlantApi from "../api/api";
/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout, setSelectedPlantData }) {
  const { currentUser } = useContext(UserContext);
  console.debug( "Navigation", "currentUser=", currentUser );
  function loggedInNav ()
  {
    return (
      <div className="navbar-container d-flex justify-content-right">
        <ul className="navbar-nav d-flex flex-wrap align-items-center">
        
          <li className="nav-item">
            <div className="nav-link">
              <SearchForm setSelectedPlantData={setSelectedPlantData} />
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out
            </Link>
        </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
        </li>
        
      </ul>
    </div>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          Plant
        </Link>
      {currentUser ? loggedInNav() : loggedOutNav() }
      </nav>
    );
  }

export default Navigation;
