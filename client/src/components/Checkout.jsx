import React from "react";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.jpg";
import { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import imagePlaceholder from "../images/no-image-icon.png";

import { loadAdDetails, loadHighestBid } from "../actions/ad";

import axios from "axios";

// import sample from "../assets/22.jpg";
import Nav from "./Nav";
import Footer from "./Footer";
import Spinner from "./Spinner";
// import product from '../assets/21.jpg';
const CheckoutPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(props);

  useEffect(() => {
    props.loadAdDetails(params.adId);
  }, [params.adId, props.loading]);

  useEffect(() => {
    props.loadHighestBid(params.adId);
  }, [params.adId]);

  useEffect(() => {
    if (!props.adDetails.sold) navigate("/");
  }, [props.adDetails.sold, props.highestBid, props.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/payments", {
        adId: params.adId,
        amount: parseFloat(
          parseInt(props.adDetails.currentPrice.$numberDecimal) +
            parseInt(props.adDetails.currentPrice.$numberDecimal) * (18 / 100)
        ), // Convert amount to a number
      });

      console.log("Payment successful:", response.data);
      // Handle success, e.g., show a success message or redirect to a confirmation page
    } catch (error) {
      if (error.response) {
        // The error has a response property
        console.error("Payment failed:", error.response.data);
        // Handle errors, e.g., show an error message to the user
      } else {
        // If error.response is undefined, handle the error in a generic way
        console.error("Payment failed: An unexpected error occurred.");
      }
    }
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <>
      <Nav />
      <div style={styles.checkoutContainer}>
        <div style={styles.container}>
          <div style={styles.leftSide}>
            <img
              src={
                props.adDetails.images[0] !== "/upload/image/undefined"
                  ? process.env.REACT_APP_API_BASE_URL +
                    "/upload/image/" +
                    props.adDetails.images[0]
                  : imagePlaceholder
              }
              alt="Product"
              style={styles.productImage}
            />
          </div>

          <div style={styles.rightSide}>
            <h2>Order Summary</h2>
            <p>Product Name: {props.adDetails.productName}</p>
            <p>Price: ₹{props.adDetails.currentPrice.$numberDecimal}</p>
            <p>
              Estimated Tax: ₹
              {parseInt(props.adDetails.currentPrice.$numberDecimal) *
                (18 / 100)}
            </p>
            <p>
              Total: ₹
              {parseInt(props.adDetails.currentPrice.$numberDecimal) +
                parseInt(props.adDetails.currentPrice.$numberDecimal) *
                  (18 / 100)}
            </p>

            <h3>Accepted Cards</h3>
            <div style={styles.acceptedCards}>
              <img src={card1} alt="Visa" style={styles.cardImage} />
              <img src={card2} alt="Mastercard" style={styles.cardImage} />
              <img
                src={card3}
                alt="American Express"
                style={styles.cardImage}
              />
              <img src={card4} alt="Discover" style={styles.cardImage} />
            </div>
            <button style={styles.proceedButton} onClick={handleSubmit}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  checkoutContainer: {
    display: "flex",
    flexDirection: "column", // Stack elements vertically
    alignItems: "center", // Center-align everything horizontally
    padding: "20px 20px 40px 20px",
    marginTop: "100px",
    marginBottom: "90px",
  },
  container: {
    display: "flex",
    justifyContent: "center", // Separate image and summary
    width: "90%", // Expand to the full width of the container
  },
  leftSide: {
    // flex: 1,
    width: "40%",
    marginRight: "20px", // Add some spacing between image and summary
  },
  productImage: {
    marginTop: "50px",
    width: "100%",
    maxWidth: "100%",
    height: "auto",
  },
  rightSide: {
    // flex: 2,
    alignItems: "center",
    padding: "20px",
    width: "70%",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  acceptedCards: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  cardImage: {
    maxWidth: "70px",
    marginRight: "10px",
  },
  proceedButton: {
    backgroundColor: "#daa520",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
    fontSize: "18px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  proceedButtonHover: {
    backgroundColor: "#0056b3",
  },
};

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
  loading: state.ad.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  highestBid: state.ad.highestBid,
});

export default connect(mapStateToProps, { loadAdDetails, loadHighestBid })(
  CheckoutPage
);

// import React, { useState } from "react";
// import axios from "axios";

// function PaymentForm() {
//   const [adId, setAdId] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/payments", {
//         adId: adId,
//         amount: parseFloat(amount), // Convert amount to a number
//       });

//       console.log("Payment successful:", response.data);
//       // Handle success, e.g., show a success message or redirect to a confirmation page
//     } catch (error) {
//       if (error.response) {
//         // The error has a response property
//         console.error("Payment failed:", error.response.data);
//         // Handle errors, e.g., show an error message to the user
//       } else {
//         // If error.response is undefined, handle the error in a generic way
//         console.error("Payment failed: An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Make a Payment</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="adId">Ad ID:</label>
//           <input
//             type="text"
//             id="adId"
//             value={adId}
//             onChange={(e) => setAdId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="amount">Amount:</label>
//           <input
//             type="number"
//             id="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Make Payment</button>
//       </form>
//     </div>
//   );
// }

// export default PaymentForm;