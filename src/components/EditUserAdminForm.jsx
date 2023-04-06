import React, { useState } from "react";
import { adminEditUserCall } from "../API-Adapter";

const EditUserAdminForm = ({token, name, email, isAdmin, isActive, userId}) => {
    // const userId = props.userId;
    // const name = props.name;
    // const email = props.email;
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [NewIsAdmin, setNewIsAdmin] = useState(isAdmin);
    const [NewIsActive, setNewIsActive] = useState(isActive);
    console.log(userId, "userId from props");

const adminEditUser = async() => {
    const response = await adminEditUserCall(token, userId, newName, newEmail, NewIsAdmin, NewIsActive);
    if(response.success){
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}


    return(
        <div>
            <form className="flex-column" onSubmit={(e) => {
                e.preventDefault();
                adminEditUser();
            }}>
                <label>Name:</label>
                <input type="text" defaultValue={name} onChange={(e) => {
                    setNewName(e.target.value)
                }}></input>
                <label>Email:</label>
                <input type="email" defaultValue={email} onChange={(e) => {
                    setNewEmail(e.target.value)
                }}></input>
                    <label>isAdmin**</label>
                    <input type="text" maxLength="5" minLength="4" defaultValue={isAdmin ? "true" : "false"} onChange={(e) => {
                    setNewIsAdmin(e.target.value)
                }}></input>
                    <label>isActive**</label>
                    <input type="text" maxLength="5" minLength="4" defaultValue={isActive ? "true" : "false"} onChange={(e) => {
                    setNewIsActive(e.target.value)
                }}></input>
                    <label>Note: Please only enter either true or false in these fields**</label>
                    <button type="submit">submit changes</button>
            </form>
        </div>
    )
}

export default EditUserAdminForm;