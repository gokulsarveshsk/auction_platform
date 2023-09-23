import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import openSocket from "socket.io-client";

import { loadAds, adPostedByOther, updateAdInList } from "../actions/ad";
import { setAlert, clearAlerts } from "../actions/alert";

import Chatbot from "./Support";
import Spinner from "./Spinner";
import Card from "./Card";
import Footer from "./Footer";
import styles from "./css/Board.module.css";

const Board = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(12);

  useEffect(() => {
    if (props.passedUser) {
      props.loadAds(props.passedUser);
    } else {
      props.loadAds();
      const socket = openSocket(process.env.REACT_APP_API_BASE_URL);
      // when new ad is added
      socket.on("addAd", (data) => {
        console.log(data);
        if (
          props.user &&
          data.ad.owner &&
          data.ad.owner.toString() !== props.user._id.toString()
        ) {
          props.clearAlerts();
          props.setAlert("New ads available", "info", 60000);
        }
      });
      // when auction starts/ends
      socket.on("auctionStarted", (res) => {
        props.updateAdInList(res.data);
      });
      socket.on("auctionEnded", (res) => {
        props.updateAdInList(res.data);
      });

      // disconnect socket when page left
      return () => {
        socket.emit("leaveHome");
        socket.off();
        props.clearAlerts();
      };
    }
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to="/login" />;
  }

  //   // Pagination
  let lastAdIndex = pageNumber * adPerPage;
  let firstAdIndex = lastAdIndex - adPerPage;
  // Page numbers for buttons
  let pageNumbers = [];
  const num = Math.ceil(props.ads.length / adPerPage);
  for (let i = 1; i <= num; i++) {
    pageNumbers.push(i);
  }

  // When page number button is clicked
  const clickPageNumberButton = (num) => {
    setPageNumber(num);
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: "100",
          right: "10px",
          bottom: "0px",
        }}
      >
        <Chatbot />
      </div>
      <div
        className="container"
        style={{
          width: "100%",
        }}
      >
        <div className="row">
          {props.ads.length > 0 ? (
            props.ads.slice(firstAdIndex, lastAdIndex).map((ad) => (
              <div
                key={ad._id}
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card ad={ad} />
              </div>
            ))
          ) : (
            <h1>No ads available</h1>
          )}
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <nav>
              <ul className="pagination justify-content-center">
                {pageNumbers.map((num) => (
                  <li key={num} className="page-item">
                    <button
                      className={`page-link ${styles["page-button"]}`}
                      style={{
                        backgroundColor: num === pageNumber ? "#2d2d2d" : "",
                        color: num === pageNumber ? "white" : "",
                        border: num === pageNumber ? "none" : "",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        marginBottom: "25px",
                      }}
                      onClick={() => clickPageNumberButton(num)}
                    >
                      {num}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      </>
  );
};

const mapStateToProps = (state) => ({
  ads: state.ad.ads,
  loading: state.ad.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadAds,
  adPostedByOther,
  updateAdInList,
  setAlert,
  clearAlerts,
})(Board);
