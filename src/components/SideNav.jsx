import React from "react";
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

const SideNav = ({allTags}) =>{
    return(
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
            {allTags.length ?(
              allTags.map((tag, idx) => {
                return(
                  <Nav.Link href={`/products/${tag.name}/${tag.id}`} key={`${idx}`}>{tag.name}</Nav.Link>
                )
              })
            ): <h3>LOADING..</h3>}
          </Nav>
        </div>
    )
};

export default SideNav;