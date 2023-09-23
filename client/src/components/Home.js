import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
// Styling
import "./css/home.css";
// Components
import Board from "./Board";
import Alert from "./Alert";
<<<<<<< HEAD
import Footer from "./Footer"
=======
import Nav from "./Nav";
import Footer from "./Footer";
>>>>>>> ad8d3b09b0805d30ea6d3c324ca8aaa84ebc2843
// import Board from "./Board";

const Home = (props) => {
  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
<<<<<<< HEAD
    <div
      className="home"
      style={{
        backgroundColor: "#F5F6FA",
      }}
    >
=======
    <div className="home">
      <Nav />
      {/* <div className='nav__display'>
        <Nav />
      </div> */}
>>>>>>> ad8d3b09b0805d30ea6d3c324ca8aaa84ebc2843
      <div className="alert__display">
        <Alert />
      </div>
      <div className="product__board">
        <Board />
      </div>
<<<<<<< HEAD
    <Footer />
=======
      <Footer />
>>>>>>> ad8d3b09b0805d30ea6d3c324ca8aaa84ebc2843
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
