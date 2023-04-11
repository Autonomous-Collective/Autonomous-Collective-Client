import React, { useState } from "react";
import { createReviewCall } from "../API-Adapter";
import { MessageAlert } from "./";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

    if (response.success) {
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
    <div id="createReviewCard">
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            rows="5"
            cols="20"
            type="text"
            placeholder="Enter Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Score</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Score"
            max="5"
            min="1"
            onChange={(e) => {
              setScore(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Content</Form.Label>
          <Form.Control
            rows="10"
            cols="20"
            type="text"
            placeholder="Enter Content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            createReview();
          }}
        >
          Post Review
        </Button>
      </Form>
    </div>
  );
};

export default CreateReview;
