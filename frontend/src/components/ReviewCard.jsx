import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { FaRegHandPointLeft, FaUserLock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineAddCircleOutline, MdOutlineRateReview } from "react-icons/md";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ productId, reviews }) => {
  const { user, loginWithRedirect } = useAuth0();
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [review, setReview] = useState("");
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const [uploadReviewLoading, setUploadReviewLoading] = useState(false);

  const handleUpload = () => {
    const uploadPromises = imageList.map((image) => {
      const imageRef = ref(
        storage,
        `reviews/${user.name}/${image.name + v4()}`
      );
      return uploadBytes(imageRef, image).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmitReview = async () => {
    try {
      setUploadReviewLoading(true);
      setReviewList((prev) => {
        return [
          ...prev,
          {
            userName: user.name,
            userImg: user.picture,
            rating: rating,
            reviewMessage: review,
          },
        ];
      });
      const uploadedImageUrls = await handleUpload();
      await axios.post(`${backendUrl}/post-review`, {
        productId,
        userName: user.name,
        userImg: user.picture,
        rating,
        reviewMessage: review,
        images: uploadedImageUrls,
      });
      setImageList([]);
      setRating(0);
    } catch (err) {
      console.log("Error on adding product", err.message);
    } finally {
      setUploadReviewLoading(false);
    }
  };
  const [reviewList, setReviewList] = useState([]);
  const fetchReviews = async () => {
    const data = await axios.post(`${backendUrl}/get-all-review`, {
      ids: reviews,
    });
    setReviewList(data.data);
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  // Left to render image of user reviews!
  // change product rating according to user reviews!

  const handleAddingReview = (e) => {
    setReview(e.target.value);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 mb-10">
        {reviewList.map((review, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 rounded-lg border border-stone-300 shadow-md shadow-stone-400"
            >
              <div className="flex items-center gap-2">
                <img
                  src={review.userImg}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <div className="flex">
                    {Array.from({ length: 5 }, (e, index) => {
                      let stars = review.rating;
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
                  </div>
                  <span>{review.userName}</span>
                </div>
              </div>
              <span className="text-sm text-stone-700">
                {review.reviewMessage}
              </span>
            </div>
          );
        })}
      </div>
      {user !== undefined ? (
        <div>
          <div className="bg-stone-200 p-6 flex flex-col gap-4 rounded-md relative">
            {uploadReviewLoading ? (
              <div className="h-60 flex justify-center items-center">
                <div className="loader">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
            ) : (
              <div>
                {imageList.length !== 0 && (
                  <span className="absolute top-6 right-6 flex items-center gap-1 bg-green-500 px-4 py-2 text-white rounded">
                    <FaCheckCircle />
                    <span className="text-sm">
                      Image uploaded successfully!
                    </span>
                  </span>
                )}
                <span className="text-2xl flex items-center gap-1 text-stone-700 font-semibold">
                  <span>Give your review</span>{" "}
                  <MdOutlineRateReview size={30} />
                </span>
                <div className="flex gap-2 py-2">
                  {user !== undefined && (
                    <img
                      src={user.picture}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <span>{user !== undefined && user.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center text-xl">
                        {[...Array(5)].map((item, index) => {
                          const givenRating = index + 1;
                          return (
                            <label key={index}>
                              <input
                                type="radio"
                                value={givenRating}
                                onClick={() => {
                                  setRating(givenRating);
                                }}
                                className="hidden"
                              />
                              <span className="cursor-pointer">
                                <FaStar
                                  className={
                                    givenRating < rating ||
                                    givenRating === rating
                                      ? "text-yellow-500"
                                      : "text-stone-500"
                                  }
                                />
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      <span className="text-sm text-stone-500 flex gap-1 items-center">
                        <FaRegHandPointLeft size={18} />
                        <span>Please give a rating!</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row bg-white px-4 items-center gap-4 border border-stone-300 rounded-lg shadow-md shadow-stone-400">
                  <textarea
                    id=""
                    rows="4"
                    placeholder="write a new review"
                    className="w-full resize-none py-4 rounded-lg focus:outline-none"
                    onChange={(e) => handleAddingReview(e)}
                  ></textarea>
                  <div className="flex pb-4 gap-2 md:flex-col">
                    <label
                      htmlFor="review-img"
                      className="flex items-center justify-center gap-2 bg-blue-600 px-6 py-2 hover:bg-blue-700 hover:scale-95 cursor-pointer transition-all duration-300 text-white text-sm rounded-md whitespace-nowrap"
                    >
                      <span>Add an image</span>
                      <LuImagePlus />
                    </label>
                    <input
                      type="file"
                      id="review-img"
                      className="hidden"
                      onChange={(e) => {
                        setImageList((prev) => {
                          if (e.target.files[0] !== undefined) {
                            if (prev.length < 4) {
                              return [...prev, e.target.files[0]];
                            }
                          }
                          return prev;
                        });
                      }}
                    />
                    <div onClick={handleSubmitReview}>
                      <PrimaryBtn
                        content="Add review"
                        icon={<MdOutlineAddCircleOutline />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <div className="flex">
            <span className="text-xl font-semibold">Login to give reviews</span>
            <section className="relative flex justify-center items-center">
              <div className="group flex justify-center transition-all rounded-full bg-gray-200 p-1">
                <svg viewBox="0 0 320 512" className="w-4 h-4">
                  <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path>
                </svg>
                <span className="absolute opacity-0 group-hover:opacity-100 whitespace-nowrap group-hover:-translate-y-7 duration-700 text-sm">
                  Create or login your account It will take no time!
                </span>
              </div>
            </section>
          </div>
          <span
            onClick={() => {
              loginWithRedirect();
            }}
          >
            <SecondaryBtn content="Login" icon={<FaUserLock />} />
          </span>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
