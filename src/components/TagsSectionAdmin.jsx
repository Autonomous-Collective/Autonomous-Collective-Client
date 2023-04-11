import React, { useState } from "react";
import { addTagToDBCall } from "../API-Adapter";
import { EditTagForm } from "./";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const TagSectionAdmin = ({ allTags, token }) => {
  const [tagName, setTagName] = useState("");

  const addTagToDB = async () => {
    for (let i = 0; i < allTags.length; i++) {
      if (allTags[i].name.toLowerCase() === tagName.toLowerCase()) {
        console.log("they can't match");
        //set error message here
        return null;
      }
    }

    const response = await addTagToDBCall(token, tagName);
    if (response.success) {
      //set success message here!
      console.log("tag successfully added! reload your page!");
    } else {
      //set error message stuff here
    }
  };
  const toggleEditForm = (tagId) => {
    const edit = document.getElementById(`edit-tag-form${tagId}`);

    if (edit.style.display === "flex") {
      edit.style.display = "none";
    } else {
      edit.style.display = "flex";
    }
  };

  return (
    <div>
      <div id="addProductContainer">
        <h2>Tags</h2>
        <Card style={{ width: "60vw", padding: "20px" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTagToDB();
            }}
          >
            <Form.Label>Add A Tag To the List!</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setTagName(e.target.value);
              }}
            />
            <Button style={{ marginTop: "20px" }} type="submit">
              Add Tag
            </Button>
          </Form>
        </Card>
      </div>
      <div id="editTagRow">
        <div id="editTagsContainer">
          {allTags?.length
            ? allTags.map((tag, idx) => {
                return (
                  <div key={`${idx} map for tags section in admin`}>
                    <Card style={{ padding: "20px" }}>
                      <Form.Label style={{ textAlign: "center" }}>
                        {tag.name}
                      </Form.Label>

                      <Button
                        className="btn-sm"
                        onClick={() => {
                          toggleEditForm(tag.id);
                        }}
                      >
                        Edit Tag
                      </Button>
                      <div
                        id={`edit-tag-form${tag.id}`}
                        className="display-none"
                      >
                        <EditTagForm token={token} tagId={tag.id} />
                      </div>
                    </Card>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default TagSectionAdmin;
