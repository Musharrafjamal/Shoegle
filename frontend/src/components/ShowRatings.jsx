import React, { useEffect, useState } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";

const ShowRatings = ({ reviews }) => {
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const [reviewArray, setReviewArray] = useState([]);
  const [ratingArray, setRatingArray] = useState([]);
  const [rating, setRating] = useState(0);

  const fetchingData = async () => {
    if (reviews !== undefined) {
      try {
        const fetchedReviews = await axios.post(
          `${backendUrl}/get-all-review`,
          { ids: reviews }
        );
        setReviewArray(fetchedReviews.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);
  useEffect(() => {
    setRatingArray((prev) => {
      return prev.concat(reviewArray.map((review) => review.rating));
    });
  }, [reviewArray]);
  useEffect(() => {
    const countRatings = ratingArray.reduce((acc, rating) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    const {
      1: r1 = 0,
      2: r2 = 0,
      3: r3 = 0,
      4: r4 = 0,
      5: r5 = 0,
    } = countRatings;

    const result =
      (5 * r5 + 4 * r4 + 3 * r3 + 2 * r2 + 1 * r1) / (r5 + r4 + r3 + r2 + r1);

    setRating(result.toFixed(1));
  }, [ratingArray]);

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (e, index) => {
        let stars = rating;
        return (
          <span key={index} className="text-[#FFB800]">
            {stars >= index + 1 ? (
              <IoIosStar />
            ) : stars >= index + 0.5 ? (
              <IoIosStarHalf />
            ) : (
              <IoIosStarOutline />
            )}
          </span>
        );
      })}
      {reviews && <span className="text-sm">({reviews.length} reviews)</span>}
    </div>
  );
};

export default ShowRatings;
