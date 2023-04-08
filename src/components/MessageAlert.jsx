import React, { useEffect } from "react";

const MessageAlert = ({ message, isError }) => {
  useEffect(() => {
    removeMessage();
  }, []);

  const removeMessage = () => {
    console.log("remove message is running");
    if (isError) {
      document.getElementById("message-alert-div").style.backgroundColor =
        "red";
    }
    setTimeout(() => {
      document.getElementById("message-alert-div").style.display = "none";
    }, 3000);
  };

  return (
    <div id="message-alert-div">
      <h1>{message}</h1>
    </div>
  );
};

export default MessageAlert;
