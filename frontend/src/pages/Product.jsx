import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import ShowRatings from "../components/ShowRatings";
import PrimaryBtn from "../components/PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { updateArray } from "../redux/arrayOfId";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewCard from "../components/ReviewCard";
import { TiHome } from "react-icons/ti";
import { BsFillCollectionFill } from "react-icons/bs";

const Product = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  //getting cart counting to show on nav!
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
      content: "Home",
      destination: "/",
      icon: <TiHome />,
    },
    {
      content: "Collection",
      destination: "/collection",
      icon: <BsFillCollectionFill />,
    },
    {
      content: `Cart ${cartCounting}`,
      destination: "/cart",
      icon: <FaCartShopping />,
    },
  ];
  const [fetchItems, setFetchItem] = useState([]);
  const [selectedImg, setSelectedImg] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const getItemUrl = `${backendUrl}/item`;
  const getItem = async () => {
    try {
      const items = await axios.post(getItemUrl, { id });
      setFetchItem(items.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    setSelectedImg(fetchItems.length !== 0 ? fetchItems.images[0] : "");
  }, [fetchItems]);

  const [idArray, setIdArray] = useState(
    JSON.parse(localStorage.getItem("idArray")) !== null
      ? JSON.parse(localStorage.getItem("idArray"))
      : []
  );
  // Adding Item to cart!
  const dispatch = useDispatch();
  const handleItemTOAddInCart = (id) => {
    const idWithQuantity = { id, quantity: 1 };
    setIdArray((prev) => [...prev, idWithQuantity]);
  };
  useEffect(() => {
    const uniqueData = Array.from(new Set(idArray.map((item) => item.id))).map(
      (uniqueId) => {
        const itemWithUniqueId = idArray.find((item) => item.id === uniqueId);
        return { id: uniqueId, quantity: itemWithUniqueId.quantity };
      }
    );
    localStorage.setItem("idArray", JSON.stringify(uniqueData));
    dispatch(updateArray(uniqueData));
  }, [idArray]);

  return (
    <div>
      <Nav btns={btns} alternate={true} />
      {fetchItems.length !== 0 ? (
        <div className="px-10 pb-8 flex flex-col gap-8">
          <div className="flex gap-8 overflow-hidden">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="w-full h-full">
                {imgLoading && (
                  <div className="h-full  flex justify-center items-center">
                    <div className="loader">
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                  </div>
                )}
                <div className="w-full h-full">
                  <img
                    src={selectedImg}
                    alt="image"
                    className="h-full w-full object-cover rounded-lg aspect-square"
                    onLoad={() => setImgLoading(false)}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-4">
              <div className="flex gap-4 w-full">
                {fetchItems.images.map((img, index) => {
                  return (
                    <img
                      key={index}
                      src={img}
                      alt="image"
                      className="w-20 aspect-square object-cover rounded cursor-pointer"
                      onClick={() => {
                        setImgLoading(true);
                        setSelectedImg(img);
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 ">
                <div>
                  <h2 className="text-stone-700 font-semibold text-4xl">
                    {fetchItems.name}
                  </h2>
                  <ShowRatings
                    reviews={fetchItems.reviews}
                  />
                </div>
                <p className="text-stone-700 text-sm">
                  {fetchItems.description}
                </p>
                <p className="text-3xl font-semibold text-green-500">
                  ₹{fetchItems.price}
                </p>
                <div
                  onClick={() => {
                    handleItemTOAddInCart(fetchItems._id);
                  }}
                  className="w-1/3"
                >
                  <PrimaryBtn icon={<FaCartPlus size={20} />} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <span className="h-[1px] w-full bg-stone-400"></span>
            <span>Reviews</span>
            <span className="h-[1px] w-full bg-stone-400"></span>
          </div>
          <div>
            <ReviewCard productId={fetchItems._id} reviews={fetchItems.reviews} />
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
