import React, { useState } from "react";
import { addTagToDBCall } from "../API-Adapter";

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

    return (
        <div>
            <h2>tags!</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                addTagToDB();
            }}>
                <label>Add A Tag To the List!</label>
                <input type="text" onChange={(e) => {
                    setTagName(e.target.value);
                }}/>
                <button type="submit" >Add Tag</button>
            </form>
            {
                allTags?.length ? 
                allTags.map((tag, idx) => {
                    return <p key={`${idx} map for tags section in admin`}>{tag.name}</p>
                }) : null
            }
            <button>add new tag</button>
        </div>
    )
}

export default TagSectionAdmin;