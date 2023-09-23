import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import Popup from "./PopUp";
import bot from "../assets/bottt.png";

function Chatbot() {
  const steps = [
    {
      id: "0",
      message: "Hey Auction Participant!",

      // This calls the next id
      // i.e. id 1 in this case
      trigger: "1",
    },
    {
      id: "1",

      // This message appears in
      // the bot chat bubble
      message: "Please write your username",
      trigger: "2",
    },
    {
      id: "2",

      // Here we want the user
      // to enter input
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: " hi {previousValue}, how can I help you?",
      trigger: 4,
    },
    {
      id: "4",
      options: [
        // When we need to show a number of
        // options to choose we create alist
        // like this
        {
          value: 2,
          label:
            " I won an auction recently, but I'm not sure how to proceed with payment.",
          trigger: 6,
        },
        { value: 4, label: " I'm having trouble with my account?", trigger: 7 },
        { value: 5, label: " I can't upload images for my item.", trigger: 10 },
        { value: 1, label: " How can I reset my password?", trigger: 11 },
        { value: 3, label: " Finished" },
      ],
    },
    {
      id: 5,
      message:
        " You can reset your password by clicking on the 'Forgot Password' or 'Reset Password' link on the login page.",
      trigger: 11,
    },

    {
      id: 6,
      message:
        "Congratulations on your win! To proceed with payment, you should receive an email with instructions on how to complete the transaction. Please check your email.",
      trigger: 11,
    },
    {
      id: 7,
      message:
        "Can you provide me with your username or email address associated with your account so that I can look into it?",
      trigger: 8,
    },
    {
      id: "8",

      // Here we want the user
      // to enter input
      user: true,
      trigger: "9",
    },
    {
      id: 9,
      message:
        "Thank you for providing your username. I'll check your account now. It appears that there might be an issue with your password.",
      trigger: 11,
    },
    {
      id: 10,
      message:
        "I'm sorry to hear that. Please check your internet connection and try again. If the issue persists, let me know, and we'll troubleshoot further.",
      trigger: 11,
    },
    {
      id: 11,
      message:
        "If you have more questions in the future, don't hesitate to contact us. Have a great day!",
      trigger: 11,
    },
    {
      id: 11,
      options: [{ value: 1, label: "Questions", trigger: 4 }],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Creating our own theme
  const theme = {
    background: "#C9FF8F",
    headerBgColor: "#197B22",
    headerFontSize: "20px",
    botBubbleColor: "#0F3789",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "#FF5733",
    userFontColor: "white",
  };

  // Set some properties of the bot
  const config = {
    botAvatar: "img.png",
    floating: true,
  };
  return (
    <div
      className="topp"
      style={{
        display: "flex",
        height: "95px",
        width: "95px",
        flexDirection: "row-reverse",
      }}
    >
      <input type="image" src={bot} alt="SUPPORT DESK" onClick={togglePopup} />
      {isOpen && (
        <Popup
          content={
            <>
              <div className="App">
                <h3>Welcome to Auction</h3>
                <ChatBot steps={steps} />
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Chatbot;
