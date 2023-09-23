import React from "react";

const Popup = (props) => {
  return (
    <div
      className="popup-box"
      style={{
        position: "absolute",
        bottom: "50px",
        right: "150px",
      }}
    >
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;