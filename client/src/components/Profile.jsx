import styles from "./css/Profile.module.css";
import backgroundImage from '../assets/background.jpeg';
import Nav from './Nav';
import { connect } from "react-redux";
import profile from '../assets/sample.jpg';
import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import Spinner from "./Spinner";

// Actions
import { getUserPurchasedAds } from "../actions/ad";

// Actions
import { clearAlerts } from "../actions/alert";

const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuth) {
      props.getUserPurchasedAds();
    }
  }, [props.loading]);

  useEffect(() => {
    return () => {
      props.clearAlerts();
    };
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    navigate("/login");
  }

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 1,
    height: '100vh',
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <>
      <Nav/>
        <div style={backgroundImageStyle} className={styles["app"]}>
          <div className={styles["card"]}>
            <div className={styles["upper-part"]}>
              <div className={styles["upper-background"]}/>
                <div className={styles["image-container"]}>
                  <img
                    src={profile}
                    alt="Profile"
                    className={styles["profile-image"]}
                  />
                </div>
            </div>
              <div className={styles["lower-part"]}>
                <h2>{props.user.username}</h2>
                <p>{props.user.email}</p>
                <p>{props.user.phone}</p>
                <button className={styles["edit-button"]}>Edit Profile</button>
              </div>
          </div>
        </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds, clearAlerts })(
  Profile
);
