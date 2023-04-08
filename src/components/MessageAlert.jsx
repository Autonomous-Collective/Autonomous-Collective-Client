import React from "react";

const MessageAlert = ({ message, isError }) => {
  if (isError) {
    document.getElementById("message-alert-div").style.backgroundColor = "red";
  }

  const removeMessage = () => {
    setTimeout(() => {
      document.getElementById("message-alert-div").style.display = "none";
    }, 3000);
  };

  return (
    <div
      onLoad={() => {
        removeMessage();
      }}
      id="message-alert-div"
    >
      <h1>{message}</h1>
    </div>
  );
};

export default MessageAlert;
