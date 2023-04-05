import React, { useState, useEffect } from "react";
import { getReviewsForProductCall } from "../API-Adapter/";
import { ReviewCard } from "./";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const getReviewsByProduct = async () => {
    const response = await getReviewsForProductCall(productId);

    if (response.success) {
      setReviews(response.reviews);
    }
  };

  useEffect(() => {
    getReviewsByProduct();
    console.log(reviews, "reveiws from ReviewList useEffect");
  }, []);

  return (
    <div>
      {reviews.map((review, idx) => {
        return <ReviewCard review={review} key={`${idx} map for review card in review list`} />;
      })}
    </div>
  );
};

export default ReviewList;
