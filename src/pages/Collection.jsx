import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import img1 from "../assets/featured-img/1.jpg";
import img2 from "../assets/featured-img/2.jpg";
import img3 from "../assets/featured-img/3.jpg";
import img4 from "../assets/featured-img/4.jpg";
import img5 from "../assets/featured-img/5.jpg";
import img6 from "../assets/featured-img/6.jpg";
import PrimaryBtn from "../components/PrimaryBtn";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import SecondaryBtn from "../components/SecondaryBtn";
import Footer from "../components/Footer";
import { FaCartShopping } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";

const Collection = () => {
  const items = [
    { name: "Green sneaker", price: 45, img: img1, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 70, img: img2, stars: 5.0, reviews: 142 },
    { name: "Green sneaker", price: 35, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 40, img: img4, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 42, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 32, img: img6, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 32, img: img6, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 32, img: img6, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 32, img: img6, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 32, img: img6, stars: 4.5, reviews: 90 },
  ];
  useEffect(() => {
    AOS.init(
      {
        duration: 1200,
        easing: "ease-in-out",
      },
      (error) => {
        if (error) {
          console.error("AOS initialization error:", error);
        }
      }
    );
  }, []);

  return (
    <div>
      <Nav alternate={true} />
      <div className="grid grid-cols-3 py-12 px-20 gap-x-8 gap-y-16 ">
        {items.map((item, index) => {
          return (
            <div key={index} className="flex gap-2" data-aos="flip-left">
              <img
                src={item.img}
                alt=""
                className="w-1/3 aspect-square object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center gap-1 ">
                <span className="text-lg font-semibold">{item.name}</span>
                <div className="flex">
                  {Array.from({ length: 5 }, (e, index) => {
                    let stars = item.stars;
                    return (
                      <span key={index} className="text-yellow-500">
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
                  <span className="text-sm">({item.reviews} reviews)</span>
                </div>
                <p>${item.price}</p>
                <div>
                  <PrimaryBtn icon={<FaCartPlus size={20} />} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" flex justify-center pb-10">
        <span className="w-1/6">
          {/* <PrimaryBtn content="View all product" /> */}
          <SecondaryBtn content="Go to cart" icon={<FaCartShopping size={25} />} destination={"/cart"} />
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
