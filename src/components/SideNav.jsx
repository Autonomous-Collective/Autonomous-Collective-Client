import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button  from "react-bootstrap/Button";

const SideNav = (props) =>{
  const allTags=props.allTags
  const setSearchString=props.setSearchString
    return(
        <div id = "sideNav" >
            <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(event) => {
                    event.preventDefault();
                    setSearchString(event.target.value);
                }}
                  />
                
            </Form>
          <Nav defaultActiveKey="/home" id="side-bar" variant="pills" >
            {allTags.length ?(
              allTags.map((tag, idx) => {
                return(
                  <Nav.Link as={Link} to={`/products/${tag.name}/${tag.id}`} key={`${idx}`}>{tag.name}</Nav.Link>
                  // href={`/products/${tag.name}/${tag.id}`}
                )
              })
            ): <h3>LOADING..</h3>}
          </Nav>
        </div>
    )
};

export default SideNav;

// type="submit"
//             onClick={(event) => {
//               event.preventDefault();
//               setSearchString(document.getElementById("searchBarInput").value);
//               document.getElementById("searchBarInput").value = "";
//             }}
//             id="searchBarButton"