import React from "react";
import PastOrders from "./PastOrders";
import UserInfo from "./UserInfo";

const UserProfilePage = (props) => {
  const pastOrders = props.pastOrders;

  return (
    <div id="userProfileContainer">
      <div id="pastOrderContainer">
      <PastOrders pastOrders={pastOrders}></PastOrders>
      </div>
      <div id="userInfoContainer">
        <UserInfo></UserInfo>
      </div>
    </div>
    //user info (api call users/me - returns name, email, password, address)
    //let them edit their info (api calls /me/edit-address, me/edit-info -name pass or email)
    //let them delete (api call /me/delete)
    //user's past carts (api call users/:userId/orders)
  );
};

export default UserProfilePage;
