import React from "react";
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

const SideNav = () =>{
    return(
        //map thru tags and "link" to tag specific product pages
        <div id = "sideNav" >
            <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
            </Form>
          <Nav defaultActiveKey="/home" id="side-bar" >
            <Nav.Link href="">Fantasy</Nav.Link>
            <Nav.Link href="">Historical Fiction</Nav.Link>
            <Nav.Link href="">Horror</Nav.Link>
          </Nav>
        </div>
    )
};

export default SideNav;