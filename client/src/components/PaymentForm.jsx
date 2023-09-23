import React, { useState } from "react";
import axios from "axios";

function PaymentForm() {
  const [adId, setAdId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/payments", {
        adId: adId,
        amount: parseFloat(amount), // Convert amount to a number
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

  return (
    <div>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="adId">Ad ID:</label>
          <input
            type="text"
            id="adId"
            value={adId}
            onChange={(e) => setAdId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
}

export default PaymentForm;
