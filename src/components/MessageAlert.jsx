import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

const MessageAlert = ({ message, isError }) => {
  useEffect(() => {
    removeMessage();
  }, []);

  const removeMessage = () => {
    console.log("remove message is running");
    
    setTimeout(() => {
      document.getElementById("message-alert-div").style.display = "none";
    }, 3000);
  };

  return (

    <Card id="message-alert-div" body>{message} </Card>
    // <div id="message-alert-div">
    //style={{width:"300px"}}
    //   <h1>{message}</h1>
    // </div>
  );
};

export default MessageAlert;
