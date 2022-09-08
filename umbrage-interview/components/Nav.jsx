import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

function Nav() {
  // Manage the active state of the hamburger menu so as to display the X instead of the three lines
  // After clicking the hamburger menu, a dropdown with the logout button is displayed
  const [isActive, setIsActive] = useState(false);

  const auth = useAuth();

  // When the user clicks the logout button, they are returned to the login page and the bearer token is cleared from localstorage
  const handleLogout = () => {
    auth.logout();
  };

  return (
    <nav
      className="navbar is-danger is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to={"/avatars"}>
            <span className="navbar-item is-size-5 has-text-white has-text-weight-bold test">
              Umbrage Interview App
            </span>
          </Link>

          <a
            onClick={() => setIsActive((prevState) => !prevState)}
            role="button"
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span className="has-text-black" aria-hidden="true"></span>
            <span className="has-text-black" aria-hidden="true"></span>
            <span className="has-text-black" aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons is-justify-content-center">
                <a onClick={handleLogout} className="button is-dark">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
