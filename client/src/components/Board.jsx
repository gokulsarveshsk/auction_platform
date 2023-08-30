import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import openSocket from "socket.io-client";

import { loadAds, adPostedByOther, updateAdInList } from "../actions/ad";
import { setAlert, clearAlerts } from "../actions/alert";

import Spinner from "./Spinner";
import Card from "./Card";

import styles from "./css/Board.module.css";

// import {
//   adAreaStyle,
//   boardCardStyle,
//   boardStyle,
//   paginationStyle,
// } from "./css/boardStyle";

const Board = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(6);

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
    // <div
    //   style={{
    //     height: "100vh",
    //     width: "100vw",
    //   }}
    // >
    <Spinner />
  ) : (
    // </div>
    <div className={styles["container"]}>
      <div className={styles["board"]}>
        {props.ads.length > 0 ? (
          props.ads
            .slice(firstAdIndex, lastAdIndex)
            .map((ad) => <Card key={ad._id} ad={ad} />)
        ) : (
          <h1>No ads available</h1>
        )}
      </div>
      {/* <div className={styles["pagination"]}>
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={styles["page-btn"]}
            onClick={() => clickPageNumberButton(num)}
          >
            {num}
          </button>
        ))}
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ads: state.ad.ads,
  loading: state.ad.loading,
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadAds,
  adPostedByOther,
  updateAdInList,
  setAlert,
  clearAlerts,
})(Board);
