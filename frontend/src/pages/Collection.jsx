import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SecondaryBtn from "../components/SecondaryBtn";
import Footer from "../components/Footer";
import { FaCartShopping } from "react-icons/fa6";
import PrimaryProductCard from "../components/PrimaryProductCard";
import { useSelector } from "react-redux";
import { TiHome } from "react-icons/ti";

const Collection = () => {
  const [cartCounting, setCartCounting] = useState(0);

  const myArray = useSelector((state) => state.arrayOfId.myArray);
  useEffect(() => {
    if (Array.isArray(myArray) && myArray.length > 0) {
      const uniqueCartItemArray = Array.from(new Set(myArray));
      setCartCounting(uniqueCartItemArray.length);
    }
  }, [myArray.length]);

  const btns = [
    {
      content: `Home`,
      destination: "/",
      secondary: true,
      icon: <TiHome size={20} />,
    },
    {
      content: `Cart ${cartCounting}`,
      destination: "/cart",
      icon: <FaCartShopping />,
    },
  ];

  return (
    <div>
      <Nav alternate={true} btns={btns} />
      <div className="flex flex-wrap justify-center p-4 gap-4">
        <PrimaryProductCard />
      </div>
      <div className=" flex justify-center pb-10">
        <span className="w-full flex justify-center">
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
//grid m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-6 xl:grid-cols-3 xl:px-10 py-12 px-4 gap-8
