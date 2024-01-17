import React from "react";
import Banner from "../components/Banner";
import img1 from "../assets/stock-images/1.webp";
import img2 from "../assets/stock-images/2.webp";
import img3 from "../assets/stock-images/3.webp";
import img4 from "../assets/stock-images/4.webp";
import img5 from "../assets/stock-images/5.webp";
import img6 from "../assets/stock-images/6.webp";
import img7 from "../assets/stock-images/7.webp";
import img8 from "../assets/stock-images/8.webp";
import SecondaryProductCard from "../components/SecondaryProductCard";

const Featured = () => {
  const items = [
    { name: "Green sneaker", price: 45, img: img1, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 45, img: img2, stars: 5.0, reviews: 142 },
    { name: "Green sneaker", price: 45, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 45, img: img4, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 45, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 45, img: img6, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 45, img: img7, stars: 3.5, reviews: 52 },
    { name: "Green sneaker", price: 45, img: img8, stars: 4.5, reviews: 12 },
  ];

  return (
    <>
      <Banner heading={"Featured"} />
      <div className="grid grid-cols-4 gap-8 py-8 px-20">
        <SecondaryProductCard items={items} />
      </div>
    </>
  );
};

export default Featured;
