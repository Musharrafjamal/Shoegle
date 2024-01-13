import React from "react";
import Banner from "../components/Banner";
import img1 from "../assets/featured-img/1.jpg";
import img2 from "../assets/featured-img/2.jpg";
import img3 from "../assets/featured-img/3.jpg";
import img4 from "../assets/featured-img/4.jpg";
import img5 from "../assets/featured-img/5.jpg";
import img6 from "../assets/featured-img/6.jpg";

const Featured = () => {
  const items = [
    { name: "Green sneaker", price: 45, img: img1 },
    { name: "Green sneaker", price: 45, img: img2 },
    { name: "Green sneaker", price: 45, img: img3 },
    { name: "Green sneaker", price: 45, img: img4 },
    { name: "Green sneaker", price: 45, img: img5 },
    { name: "Green sneaker", price: 45, img: img6 },
  ];
  return (
    <>
      <Banner />
      <div className="grid grid-cols-3 gap-8 py-8 px-16">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className=" shadow-xl flex flex-col gap-4 items-center rounded-lg px-12 py-8 cursor-pointer transition-all hover:scale-95 duration-300"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="flex flex-col gap-y-2">
                <h2 className="text-3xl font-semibold text-stone-800">
                  {item.name}
                </h2>
                <p className="text-right">${item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Featured;
