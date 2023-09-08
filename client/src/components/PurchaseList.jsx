import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// Project files
import Spinner from "./Spinner";
import Nav from "./Nav";
import PCard from "./PCard";

// Actions
import { getUserPurchasedAds } from "../actions/ad";

const PurchaseList = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuth) {
      props.getUserPurchasedAds();
    }
  }, [props.loading]);

  if (!props.isAuth) {
    navigate("/login");
  }

  console.log(props);

  return props.purchasedLoading ? (
    <Spinner />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {props.purchased.map((ad) => {
        {
          console.log(ad);
        }
        return <PCard ad={ad} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds })(PurchaseList);
