import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

const MessageAlert = ({ message, isError }) => {
  useEffect(() => {
    removeMessage();
  }, []);

  const removeMessage = () => {
    setTimeout(() => {
      document.getElementById("message-alert-div").style.display = "none";
    }, 3000);
  };

  return (
    <Card id="message-alert-div" body>
      {message}{" "}
    </Card>
  );
};

export default MessageAlert;
