// import React from "react";
import { connect } from "react-redux";
// import { Link as RouterLink } from "react-router-dom";

// Actions
import { logout } from "../actions/auth";

import React, { useState } from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BootstrapNavbar = (props) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavbarCollapse = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
        marginBottom: "10px",
      }}
    >
<<<<<<< HEAD
      <RouterLink className="navbar-brand" to="/">
        {/* <span className={`ml-2 ${styles.navLogo}`}>Auction🔨</span> */}
      </RouterLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {props.isAuthenticated ? (
        <div className={`collapse navbar-collapse`} id="navbarNavDropdown">
          <ul className={`navbar-nav ${styles.navContainer}`}>
            <div className={styles.navCenter}>
              <li className="nav-item">
                <RouterLink className={`nav-link ${styles.navLink}`} to="/">
                  Home
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink
                  className={`nav-link ${styles.navLink}`}
                  to="/dashboard"
                >
                  Profile
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className={`nav-link ${styles.navLink}`} to="/profile">
                  Profile
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink
                  className={`nav-link ${styles.navLink}`}
                  to="/postad"
                >
                  Post Ad
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink
                  className={`nav-link ${styles.navLink}`}
                  to="/myads"
                >
                  AdList
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink
                  className={`nav-link ${styles.navLink}`}
                  to="/purchaseList"
                >
                  MyPurchase
                </RouterLink>
              </li>
            </div>
            <div className={styles.navRight}>
              <li className={`nav-item ${styles.logout}`}>
                <RouterLink
                  className={`nav-link ${styles.navLink}`}
                  to="/login"
                  onClick={props.logout}
                >
                  Logout
                </RouterLink>
              </li>
            </div>
          </ul>
        </div>
      ) : (
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <RouterLink className="nav-link" to="/login">
                Login
              </RouterLink>
            </li>
            <li className="nav-item">
              <RouterLink className="nav-link" to="/register">
                Register
              </RouterLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
=======
      <Container>
        <Link to="/" className="navbar-brand">
          Auction🔨
        </Link>
        <Navbar.Toggle
          aria-controls="navbar-menu"
          onClick={handleNavbarCollapse}
        />
        <Navbar.Collapse
          id="navbar-menu"
          className={isNavbarCollapsed ? "collapse" : ""}
        >
          <Nav
            className="me-auto"
            style={{
              margin: "0 auto",
            }}
          >
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/dashboard" className="nav-link">
              Profile
            </Link>
            <Link to="/postad" className="nav-link">
              Post Ad
            </Link>
            <Link to="/purchaseList" className="nav-link">
              Your Purchases
            </Link>
          </Nav>
          <Nav>
            <Link
              to="/login"
              className="nav-link btn-secondary"
              onClick={props.logout}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
>>>>>>> ad8d3b09b0805d30ea6d3c324ca8aaa84ebc2843
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(BootstrapNavbar);
