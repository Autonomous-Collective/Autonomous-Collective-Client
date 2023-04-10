import React, { useState } from "react";
import { editTagCall } from "../API-Adapter";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const EditTagForm = ({ token, tagId }) => {
    const [newTagName, setNewTagName] = useState("");
    const [isError, setIsError] = useState(false);
 
    const editTag = async() => {
        const response = await editTagCall(token, tagId, newTagName);
        if(response.success){
            //set success message here!
            console.log("tag was edited!");
            setTimeout(() => {
                window.location.reload();
            }, 1500)
        }else{
            //set error message here!
        }
    }
    

    return(
        <Form onSubmit={(e) => {
            e.preventDefault();
            editTag();
        }}>
            <Form.Label>New Tag Name:</Form.Label>
            <Form.Control type="text" onChange={(e) => {
                setNewTagName(e.target.value);
            }}/>
            <Button variant="success" type="submit">Change Tag!</Button>
        </Form>
    )
}

export default EditTagForm;