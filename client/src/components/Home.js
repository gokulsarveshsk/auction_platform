import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
// Styling
import "./css/home.css";
// Components
import Board from "./Board";
import Alert from "./Alert";
import Nav from "./Nav";
import Footer from "./Footer";
// import Board from "./Board";

const Home = (props) => {
  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home">
      <Nav />
      {/* <div className='nav__display'>
        <Nav />
      </div> */}
      <div className="alert__display">
        <Alert />
      </div>
      <div className="product__board">
        <Board />
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
