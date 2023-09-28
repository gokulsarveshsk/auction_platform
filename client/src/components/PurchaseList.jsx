import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import imagePlaceholder from "../images/no-image-icon.png";

// Project files
import Spinner from "./Spinner";
import Nav from "./Nav";

import axios from "axios";

// Actions
import { getUserPurchasedAds } from "../actions/ad";
const moment = require("moment-timezone");

const PurchaseList = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (props.isAuth) {
      props.getUserPurchasedAds();
    }
  }, [props.loading]);

  if (!props.isAuth) {
    navigate("/login");
  }

  const handlePurchasedDetails = (adId) => {
    navigate("/ads/" + adId);
  };

  const handlePurchasedPayments = (adId) => {
    navigate("/checkout/" + adId);
  };

  const getPaymentStatus = async (adId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/payments/${adId}`
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  console.log(props);

  return props.purchasedLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Nav />
      <table
        style={{
          width: "90%",
          border: "None",
          borderCollapse: "collapse",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <thead
          style={{
            borderBottom: "1px solid #ddd",
          }}
        >
          <tr>
            <th
              style={{
                textAlign: "left",
                fontSize: "1.2rem",
                fontWeight: "bold",
                padding: "0 0 15px",
              }}
            >
              Product
            </th>
            <th
              style={{
                // textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Base Price
            </th>
            <th
              style={{
                // textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Bought Price
            </th>
            <th
              style={{
                // textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Date
            </th>
            <th
              style={{
                textAlign: "left",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Info
            </th>
            <th
              style={{
                textAlign: "right",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Payment
            </th>
          </tr>
        </thead>
        <tbody>
          {props.purchased.map((ad) => (
            <tr
              key={ad._id}
              style={{
                borderBottom: "1px solid #ddd",
              }}
            >
              <td
                style={{
                  // textAlign: "center",
                  padding: "10px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      ad.image !== "/upload/image/undefined"
                        ? process.env.REACT_APP_API_BASE_URL +
                          "/upload/image/" +
                          ad.images[0]
                        : imagePlaceholder
                    }
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      marginRight: "10px",
                    }}
                  />
                  <p
                    style={{
                      margin: "0",
                      fontFamily: "GilroySemiBold",
                      // marginRight: "-50px",
                      marginLeft: "10px",
                    }}
                  >
                    {ad.productName}
                  </p>
                </div>
              </td>
              <td>
                <p
                  style={{
                    margin: "0",
                    // textAlign: "center",
                  }}
                >
                  ₹{ad.basePrice.$numberDecimal}
                </p>
              </td>
              <td>
                <p
                  style={{
                    margin: "0",
                    // textAlign: "center",
                  }}
                >
                  ₹{ad.currentPrice.$numberDecimal}
                </p>
              </td>
              <td>
                <p
                  style={{
                    margin: "0",
                    // textAlign: "center",
                  }}
                >
                  {moment.unix(ad.endTime.$numberDecimal).format("YYYY-MM-DD")}
                </p>
              </td>
              <td
                style={
                  {
                    // textAlign: "right",
                  }
                }
              >
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#2d2d2d",
                    border: "none",
                  }}
                  onClick={() => handlePurchasedDetails(ad._id)}
                >
                  Details
                </button>
              </td>
              <td
                style={{
                  textAlign: "right",
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#daa520",
                    border: "none",
                  }}
                  onClick={() => handlePurchasedPayments(ad._id)}
                >
                  Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
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