import React from "react";
import Card from "react-bootstrap/Card";
let reviewString = "";

const ReviewCard = ({ review }) => {
  if (review.score > 5) {
    review.score = 5;
  }

  for (let i = 0; i < review.score; i++) {
    if (i === 0) {
      reviewString = "";
    }
    reviewString += "star ";
    console.log(reviewString, "reveiwString", review.score, "reveiw.score");
  }
  return (
    <div id="reviewCard">
      <Card>
        <Card.Header as="h5">{review.title}</Card.Header>
        <Card.Body>
          <Card.Title>
            {<i className="material-icons star">{reviewString}</i>}
          </Card.Title>
          <Card.Subtitle>by {review.name}</Card.Subtitle>
          <Card.Text>{review.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ReviewCard;
