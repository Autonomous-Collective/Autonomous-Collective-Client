import React, { useState } from "react";
import { createReviewCall } from "../API-Adapter";
import { MessageAlert } from "./";

const CreateReview = ({ productId, token }) => {
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const createReview = async () => {
    const response = await createReviewCall(
      productId,
      token,
      score,
      title,
      content
    );
    console.log(response, "response from api stuff in front end");

    if (response.success) {
      //MAKE THIS ACTUALLY DO SOMETHING!!!!
      setMessage("Review succesfully posted");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Error Posting Review");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  return (
    <div>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <h1>create a review</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createReview();
        }}
      >
        <label>Title:</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label>Score:</label>
        <input
          type="number"
          max="5"
          min="1"
          onChange={(e) => {
            setScore(e.target.value);
          }}
        ></input>
        <label>Content:</label>
        <textarea
          rows="5"
          cols="20"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button type="submit">post review</button>
      </form>
    </div>
  );
};

export default CreateReview;
