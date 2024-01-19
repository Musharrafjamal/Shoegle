import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SecondaryBtn from "../components/SecondaryBtn";
import Footer from "../components/Footer";
import { FaCartShopping } from "react-icons/fa6";
import PrimaryProductCard from "../components/PrimaryProductCard";

const Collection = () => {
  const [cartCounting, setCartCounting] = useState();

  useEffect(() => {
    const storedIdArray = JSON.parse(localStorage.getItem("idArray"));
    
    if (Array.isArray(storedIdArray) && storedIdArray.length > 0) {
      // If it's an array and not empty
      const uniqueCartItemArray = Array.from(new Set(storedIdArray));
      setCartCounting(uniqueCartItemArray.length);
    } else {
      // Handle the case when the storedIdArray is not an array or is empty
      setCartCounting("");
    }
  }, []);
  
  const btns = [
    {
      content: "Home",
      destination: "/",
      secondary: true,
      linkTag: true,
      width: "w-24",
    },
    {
      content: `Cart ${cartCounting}`,
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
        <PrimaryProductCard />
      </div>
      <div className=" flex justify-center pb-10">
        <span className="w-1/6">
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
