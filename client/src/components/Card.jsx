import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Actions
import {
  loadAdDetails,
  loadAdImages,
  setImageLoadingStatus,
} from "../actions/ad";

// Files
import imagePlaceholder from "../images/no-image-icon.png";
import Spinner from "./Spinner";

import styles from "./css/Card.module.css";

const moment = require("moment-timezone");

function MediaCard(props) {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  console.log(props);
  const navigate = useNavigate();

  function formatTimeDifference(diff) {
    const duration = moment.duration(diff);
    let hours = Math.floor(duration.asHours());
    let minutes = duration.minutes();
    let seconds = duration.seconds();

    console.log(hours, minutes, seconds);

    hours = hours > 9 ? hours.toString() : "0" + hours;
    minutes = minutes > 9 ? minutes.toString() : "0" + minutes;
    seconds = seconds > 9 ? seconds.toString() : "0" + seconds;

    return [hours, minutes, seconds];
  }

  useEffect(() => {
    let interval;
    if (!props.ad.auctionStarted && !props.ad.auctionEnded) {
      interval = setInterval(() => {
        if (props.ad.startTime?.$numberDecimal) {
          let diff = moment(
            moment.unix(props.ad.startTime.$numberDecimal)
          ).diff(moment());
          let [remHrs, remMins, remSecs] = formatTimeDifference(diff);
          setHour(remHrs);
          setMinute(remMins);
          setSecond(remSecs);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [props.ad.auctionStarted, props.ad.auctionEnded, props.ad.startTime]);

  useEffect(() => {
    let interval;
    if (props.ad.auctionStarted) {
      interval = setInterval(() => {
        if (props.ad.endTime?.$numberDecimal) {
          let diff = moment(moment.unix(props.ad.endTime.$numberDecimal)).diff(
            moment()
          );
          let [remHrs, remMins, remSecs] = formatTimeDifference(diff);
          setHour(remHrs);
          setMinute(remMins);
          setSecond(remSecs);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [props.ad.auctionEnded, props.ad.endTime]);

  function secondsToHMS(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);

    h = h > 9 ? h.toString() : "0" + h;
    m = m > 9 ? m.toString() : "0" + m;
    s = s > 9 ? s.toString() : "0" + s;

    return [h, m, s];
  }

  const handleCardClick = (e) => {
    navigate(`/ads/${props.ad._id}`);
  };

  // Auction status based on the ad-details
  const updateAuctionStatus = (ad) => {
    if (ad.sold) {
      return "Sold";
    } else if (ad.auctionEnded) {
      return "Ended, not-sold";
    } else if (!ad.auctionStarted) {
      return "Upcoming";
    } else {
      return "Ongoing";
    }
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          // boxShadow: "0 0 10px 0.5px #dfdfdf",
          border: "1px solid #dfdfdf",
          borderRadius: "5px",
          // border: "none",
          cursor: "pointer",
          margin: "10px",
        }}
        className="card"
        onClick={(e) => {
          handleCardClick(e);
        }}
      >
        {!props.dashCard && (
          <div
            style={{
              background: `url(${
                props.ad.image !== "/upload/image/undefined"
                  ? process.env.REACT_APP_API_BASE_URL +
                    "/upload/image/" +
                    props.ad.images[0]
                  : imagePlaceholder
              })`,
              width: "100%",
              backgroundPosition: "center",
              backgroundPositionY: "25%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              // objectFit: "contain",
            }}
            className={`${styles["img"]}`}
          >
            <div className={styles["img-overlay"]}>
              <div>
                <p>Hours</p>
                <div className={styles["time"]}>
                  <span>
                    <h3>{hour}</h3>
                    {/* <h3>{hour}</h3> */}
                    <p>h</p>
                  </span>
                </div>
              </div>
              <div>
                <p>Minute</p>
                <div className={styles["time"]}>
                  <span>
                    {/* <h3>{min}</h3> */}
                    <h3>{minute}</h3>
                    <p>m</p>
                  </span>
                </div>
              </div>
              <div>
                <p>Second</p>
                <div className={styles["time"]}>
                  <span>
                    {/* <h3>{seconds}</h3> */}
                    <h3>{second}</h3>
                    <p>s</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            padding: `10px 10px`,
            borderRadius: `0 0 5px 5px`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h5
              style={{
                fontSize: "1rem",
                fontFamily: "GilroyRegular",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              {props.ad.productName}
            </h5>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
              }}
            >
              <p>₹</p>
              <p>{props.ad.currentPrice.$numberDecimal}</p>
            </span>
          </div>
          <div>
            <p>{updateAuctionStatus(props.ad)}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
});

export default connect(mapStateToProps, {
  loadAdDetails,
  loadAdImages,
  setImageLoadingStatus,
})(MediaCard);