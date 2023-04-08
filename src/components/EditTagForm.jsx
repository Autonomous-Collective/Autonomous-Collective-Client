import React, { useState } from "react";
import { editTagCall } from "../API-Adapter";

const EditTagForm = ({ token, tagId }) => {
    const [newTagName, setNewTagName] = useState("");
 
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
        <form onSubmit={(e) => {
            e.preventDefault();
            editTag();
        }}>
            <label>new tag name:</label>
            <input type="text" onChange={(e) => {
                setNewTagName(e.target.value);
            }}/>
            <button type="submit">change tag!</button>
        </form>
    )
}

export default EditTagForm;