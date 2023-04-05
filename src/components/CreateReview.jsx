import React, {useState} from "react";
import { createReviewCall } from "../API-Adapter";

const CreateReview = ({ productId }) => {
    const [title, setTitle] = useState("");
    const [score, setScore] = useState(0);
    const [content, setContent] = useState("");

const createReview = async() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwYXJrZXIuam9zaWUuZWRlbkBnbWFpbC5jb20iLCJpYXQiOjE2ODA3MjE4NzZ9.X-eiIepbNddQ_8Liol4eZa8AhqvGflFkHG3_ANiQNHg"
    const response = await createReviewCall(productId, token, score, title, content);
    console.log(response, "response from api stuff in front end");

    if(response.success){
        //MAKE THIS ACTUALLY DO SOMETHING!!!!   
        setTimeout(() => {

            window.location.reload();
        }, 1500);
    }
}

    return (
        <div>
            <h1>create a review</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                createReview();
            }}>
                <label>Title:</label>
                <input type="text" onChange={(e) => { setTitle(e.target.value) }}></input>
                <label>Score:</label>
                <input type="number" max="5" min="1" onChange={(e) => { setScore(e.target.value) }} ></input>
                <label>Content:</label>
                <textarea rows="5" cols="20" onChange={(e) => { setContent(e.target.value) }}></textarea>
                <button type="submit">post review</button>
            </form>
        </div>
    )
}

export default CreateReview;