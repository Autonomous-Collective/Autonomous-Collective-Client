import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import UserEditInfo from "./UserEditInfo";
import UserEditAddress from "./UserEditAddress";
import { selfDeactivateUserCall } from "../API-Adapter";

const UserInfo = (props) => {
  const token = props.token;
  const userInfo = props.userInfo;
  const userAddress = props.userAddress;
  const setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();

  const selfDeactivateUser = async () => {
    try {
      const result = await selfDeactivateUserCall(token);
      if (result.success) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* {userInfo.length && userAddress.length ?  */}
      <Card style={{ width: "20rem" }}>
        <Card.Header>Your Info:</Card.Header>
        <Card.Body>
          <Card.Title>Name</Card.Title>
          <Card.Text>{`${userInfo.name}`}</Card.Text>

          <Card.Title>Email</Card.Title>
          <Card.Text>{`${userInfo.email}`}</Card.Text>
          {userAddress === null ? <div className="loader"></div> : 
          userAddress ? (
            <div id="userAddressCard">
              <Card.Title>Shipping Name</Card.Title>
              <Card.Text>{`${userAddress.name}`}</Card.Text>
              <Card.Title>Address</Card.Title>
              <Card.Text>{`${userAddress.address}`}</Card.Text>
              <Card.Title>City/State</Card.Title>
              <Card.Text>{`${userAddress.city}, ${userAddress.state}`}</Card.Text>
            </div>
          ) : (
            <h3> No Address </h3>
          )}
        </Card.Body>
        <div className="login-buttons">
          <Card.Body>
            <UserEditInfo token={token} />
            {/* <Button href="#" variant="secondary">Edit your info</Button> */}
          </Card.Body>
          <Card.Body>
            <UserEditAddress token={token} userAddress={userAddress} />
          </Card.Body>
          <Card.Body>
            <Button
              onClick={async (event) => {
                event.preventDefault();
                confirm("Are you sure you want to delete your account?");
                if (confirm) {
                  selfDeactivateUser();
                }
              }}
              href="#"
              variant="danger"
            >
              Delete your Account
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default UserInfo;
