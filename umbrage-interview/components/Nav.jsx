import { useState } from "react";
import { useAuth } from "../hooks/auth";

function Nav() {
  // Manage the active state of the hamburger menu so as to display the X instead of the three lines
  // and the Logout button when the hamburger button is clicked
  const [isActive, setIsActive] = useState(false);

  const auth = useAuth();

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
          <span className="navbar-item is-size-5 has-text-white has-text-weight-bold test">
            Umbrage Interview App
          </span>

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
