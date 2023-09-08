import React from "react";

const PCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100px",
        width: "500px",
        border: "1px solid black",
        color: "#000",
      }}
    >
      {props.ad.productName}
    </div>
  );
};

export default PCard;
