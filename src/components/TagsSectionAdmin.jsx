import React from "react";

const TagSectionAdmin = ({ allTags, token }) => {
    return (
        <div>
            <h2>tags!</h2>
            {
                allTags?.length ? 
                allTags.map((tag, idx) => {
                    return <p key={`${idx} map for tags section in admin`}>{tag.name}</p>
                }) : null
            }
            <button>add new tag</button>
            <form>
                <label>Add A Tag To the List!</label>
                <input type="text"/>
                <button>Add Tag</button>
            </form>
        </div>
    )
}

export default TagSectionAdmin;