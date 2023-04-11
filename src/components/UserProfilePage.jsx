import React, {useState, useEffect} from "react";
import PastOrders from "./PastOrders";
import UserInfo from "./UserInfo";

import { getUserInfoCall } from '../API-Adapter';

const UserProfilePage = (props) => {
  const pastOrders = props.pastOrders;
  const token = props.token;
  const setIsLoggedIn = props.setIsLoggedIn

  const [userInfo, setUserInfo] = useState([]);
  const [userAddress, setUserAddress] = useState(null);

  
  const getUserInfo = async () => {
      const result = await getUserInfoCall(token);
      if(result.success){
          setUserInfo(result.user);
          setUserAddress(result.user.address);
          console.log(result.user, "HELLOOO");
        } else {
          setUserAddress([])
        }
    }
    
    useEffect(() => {
        getUserInfo();
    }, [token]);
    
    console.log(userInfo, "THIS IS USEr INFO")

  return (
    <div id="userProfileContainer">
      <div id="pastOrderContainer">
      <PastOrders pastOrders={pastOrders}></PastOrders>
      </div>
      <div id="userInfoContainer">
        {userAddress || userInfo ?
        <UserInfo userInfo={userInfo} userAddress={userAddress} token={token} setIsLoggedIn={setIsLoggedIn}></UserInfo> : <div className="loader"></div>}
      </div>
    </div>
    //user info (api call users/me - returns name, email, password, address)
    //let them edit their info (api calls /me/edit-address, me/edit-info -name pass or email)
    //let them delete (api call /me/delete)
  );
};

export default UserProfilePage;
