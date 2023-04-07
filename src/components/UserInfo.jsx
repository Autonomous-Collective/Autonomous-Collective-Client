import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import UserEditInfo from "./UserEditInfo";
import UserEditAddress from './UserEditAddress';

const UserInfo = (props) => {
  const token = props.token;
  const userInfo = props.userInfo;
  const userAddress = props.userAddress;
  
  return (
    <Card style={{ width: '20rem' }} >
      <Card.Header>Your Info:</Card.Header>
      <Card.Body>
        <Card.Title>Name</Card.Title>
        <Card.Text>
          {`${userAddress.name}`}
        </Card.Text>

        <Card.Title>Email</Card.Title>
        <Card.Text>
            {`${userInfo.email}`}
        </Card.Text>

        <Card.Title>Address</Card.Title>
        <Card.Text>{`${userAddress.address}`}</Card.Text>
        <Card.Title>City/State</Card.Title>
        <Card.Text>{`${userAddress.city}, ${userAddress.state}`}</Card.Text>
        
      </Card.Body>
    <div className="login-buttons">
      <Card.Body>
        <UserEditInfo token={token}/>
        {/* <Button href="#" variant="secondary">Edit your info</Button> */}
      </Card.Body>
      <Card.Body>
        <UserEditAddress token={token}/>
      </Card.Body>
      <Card.Body>
        <Button href="#" variant="danger">Delete your Account</Button>
      </Card.Body>
    </div>
    </Card>
  );
}

export default UserInfo;