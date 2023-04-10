import React, { useState } from "react";
import { addTagToDBCall } from "../API-Adapter";
import { EditTagForm } from "./";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const TagSectionAdmin = ({ allTags, token }) => {
    const [tagName, setTagName] = useState("");

    const addTagToDB = async() => {

        for(let i =  0; i < allTags.length; i++){
            if(allTags[i].name.toLowerCase() === tagName.toLowerCase()){
                console.log("they can't match");
                //set error message here
                return null;
            }
        }

        const response = await addTagToDBCall(token, tagName);
        if(response.success){
            //set success message here!
            console.log("tag successfully added! reload your page!");
        }else{
            //set error message stuff here
        }
    }
    const toggleEditForm = (tagId) => {
        const edit = document.getElementById(`edit-tag-form${tagId}`);

        if(edit.style.display === "flex"){
            edit.style.display = "none";
        }else{
            edit.style.display = "flex";
        }
    }

    return (
        <div>
            <h2>tags!</h2>
            <Form onSubmit={(e) => {
                e.preventDefault();
                addTagToDB();
            }}>
                <Form.Label>Add A Tag To the List!</Form.Label>
                <Form.Control type="text" onChange={(e) => {
                    setTagName(e.target.value);
                }}/>
                <Button type="submit" >Add Tag</Button>
            </Form>
            <div className="flex-row">
            {
                allTags?.length ? 
                allTags.map((tag, idx) => {
                    return <div key={`${idx} map for tags section in admin`}> 
                    <p>{tag.name}</p>
                   
                        <Button onClick={() => {
                            toggleEditForm(tag.id);
                        }}>edit tag!</Button>
                        <div id={`edit-tag-form${tag.id}`} className="display-none">
                            <EditTagForm token={token} tagId={tag.id}/>
                        </div>
                   
                    </div>
                }) : null
            }
            </div>
        </div>
    )
}

export default TagSectionAdmin;