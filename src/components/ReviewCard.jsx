import React from "react";
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
    <div>
      <h4>{review.title}</h4>
      <h3>{<i className="material-icons">{reviewString}</i>}</h3>
      <p>by {review.name}</p>
      <p>{review.content}</p>
    </div>
  );
};

export default ReviewCard;
