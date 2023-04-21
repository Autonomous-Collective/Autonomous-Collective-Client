import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import sideNavStyling from "./componentStyles/sideNavStyling.css"

const SideNav = (props) => {
  const allTags = props.allTags;
  const setSearchString = props.setSearchString;

  const [activeTag, setActiveTag] = useState(0);

  const locationHook = useLocation();

  useEffect(() => {
    let tempTag = locationHook.pathname.slice(-2)
    if (
      tempTag.includes("/")
    ) {
      tempTag = tempTag.slice(-1)
    }
    tempTag = Number(tempTag)
    setActiveTag(tempTag);
  }, []);

  return (
    <div id="sideNav">
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
      <Nav defaultActiveKey="/home" id="side-bar" variant="pills">
        {allTags.length ? (
          allTags.map((tag, idx) => {
            return (
              <Nav.Link
                onClick={() => {
                  setActiveTag(tag.id);
                }}
                className={
                  activeTag === tag.id ? "activeTag" : "inactiveTag"
                }
                as={Link}
                to={`/products/${tag.name}/${tag.id}`}
                key={`${idx}`}
              >
                {tag.name}
              </Nav.Link>
            );
          })
        ) : (
          <div className="loader"></div>
        )}
      </Nav>
    </div>
  );
};

export default SideNav;
