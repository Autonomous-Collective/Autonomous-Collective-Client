import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

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

    <Card style={{width:"300px"}} id="message-alert-div" body>{message} </Card>
    // <div id="message-alert-div">
    //   <h1>{message}</h1>
    // </div>
  );
};

export default MessageAlert;
