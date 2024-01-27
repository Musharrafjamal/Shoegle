import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const ShowRatings = ({ rating, reviews }) => {
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
