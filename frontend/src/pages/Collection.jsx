import React from "react";
import Nav from "../components/Nav";
import img1 from "../assets/stock-images/1.webp";
import img2 from "../assets/stock-images/2.webp";
import img3 from "../assets/stock-images/3.webp";
import img4 from "../assets/stock-images/4.webp";
import img5 from "../assets/stock-images/5.webp";
import img6 from "../assets/stock-images/6.webp";
import img7 from "../assets/stock-images/7.webp";
import img8 from "../assets/stock-images/8.webp";
import img9 from "../assets/stock-images/9.webp";
import img10 from "../assets/stock-images/10.webp";
import img11 from "../assets/stock-images/11.webp";
import img12 from "../assets/stock-images/12.webp";
import img13 from "../assets/stock-images/13.webp";
import img14 from "../assets/stock-images/14.webp";
import img15 from "../assets/stock-images/15.webp";
import img16 from "../assets/stock-images/16.webp";
import "aos/dist/aos.css";
import SecondaryBtn from "../components/SecondaryBtn";
import Footer from "../components/Footer";
import { FaCartShopping } from "react-icons/fa6";
import PrimaryProductCard from "../components/PrimaryProductCard";
import {useSelector} from "react-redux"

const Collection = () => {
  const items = [
    { name: "Green sneaker", price: 45, img: img1, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 70, img: img2, stars: 5.0, reviews: 142 },
    { name: "Green sneaker", price: 35, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img4, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img5, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img6, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 35, img: img7, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 40, img: img8, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 42, img: img9, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img10, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img11, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img12, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 42, img: img13, stars: 2.5, reviews: 122 },
    // { name: "Green sneaker", price: 42, img: img14, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 32, img: img15, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 32, img: img16, stars: 4.5, reviews: 90 },
  ];
  const count = useSelector(state => state.counter)

  const btns = [
    {
      content: "Home",
      destination: "/",
      secondary: true,
      linkTag: true,
      width: "w-24",
    },
    {
      content: `Cart ${count}`,
      destination: "/cart",
      linkTag: true,
      icon: <FaCartShopping />,
      width: "w-24",
    },
  ];

  return (
    <div>
      <Nav alternate={true} btns={btns} />
      <div className="grid grid-cols-3 py-12 px-20 gap-x-8 gap-y-16 ">
        <PrimaryProductCard items={items} />
      </div>
      <div className=" flex justify-center pb-10">
        <span className="w-1/6">
          {/* <PrimaryBtn content="View all product" /> */}
          <SecondaryBtn
            content="Go to cart"
            icon={<FaCartShopping size={25} />}
            destination={"/cart"}
            linkTag={true}
          />
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
