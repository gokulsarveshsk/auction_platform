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
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(BootstrapNavbar);
