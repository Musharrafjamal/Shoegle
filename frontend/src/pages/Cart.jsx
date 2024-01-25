import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { updateArray } from "../redux/arrayOfId";
import axios from "axios";
import Footer from "../components/Footer";
import { FaArrowLeftLong } from "react-icons/fa6";

const Cart = () => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const idArray = useSelector((state) => state.arrayOfId.myArray);
  const [arrayOfId, setArrayOfId] = useState((prev) =>
    idArray.length === 0 ? localIdArray : idArray
  );

  const dispatch = useDispatch();
  const backendUrl = useSelector((state) => state.backendUrlSlice);

  const btns = [
    {
      content: "Home",
      destination: "/",
      secondary: true,
      linkTag: true,
      width: "w-24",
    },
    {
      content: "Collection",
      destination: "/collection",
      linkTag: true,
      icon: <FaCartShopping />,
      width: "w-28",
    },
  ];
  const [fetchItems, setFetchItem] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const getItemUrl = `${backendUrl}/get-cart-item`;
  const webGetItem = "https://shoegle-production.up.railway.app/get-cart-item";

  const fetchItem = async () => {
    try {
      const items = await axios.post(getItemUrl, { id: arrayOfId });
      setFetchItem(items.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    fetchItem();
    localStorage.setItem("idArray", JSON.stringify(arrayOfId));
  }, [arrayOfId]);
  useEffect(() => {
    const mergedArray = fetchItems.map((item) => {
      const mergeItem = arrayOfId.find(
        (mergeItem) => mergeItem.id === item._id
      );

      if (mergeItem) {
        return { ...item, id: mergeItem.id, quantity: mergeItem.quantity };
      } else {
        return item;
      }
    });
    setMergedData(mergedArray);
  }, [fetchItems, arrayOfId]);

  const handleRemoveItem = (id) => {
    // const newArray = mergedData.filter((e, i) => e._id !== id);
    const newArrayOfId = arrayOfId.filter((e, i) => e.id !== id);
    setArrayOfId(newArrayOfId)
    // setMergedData(newArray);
    // dispatch(updateArray(newArray));
    // localStorage.setItem("idArray", JSON.stringify(newArray));
  };

  const handleIncreasingQuantity = async (oldId, quantity) => {
    setArrayOfId((prevArray) => {
      const updatedQuantity = prevArray.map((item) => {
        if (oldId === item.id) {
          return { ...item, quantity: quantity + 1 };
        }
        return item;
      });
      return updatedQuantity;
    });
  };
  const handledecreasingQuantity = (oldId, quantity) => {
    // console.log(arrayOfId)
    setArrayOfId((prevArray) => {
      const updatedQuantity = prevArray.map((item) => {
        if (oldId === item.id && quantity > 1) {
          return { ...item, quantity: quantity - 1 };
        }
        return item;
      });
      return updatedQuantity;
    });
  };

  const GetTotalAmount = () => {
    const totalAmount = mergedData.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return totalAmount;
  };

  useEffect(() => {
    const totalAmount = GetTotalAmount();
    setTotalAmount(totalAmount);
  }, [mergedData]);

  return (
    <>
      <Nav alternate={true} btns={btns} />
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      ) : (
        <main className="bg-white w-full">
          <div className="w-full flex justify-between items-center px-12 py-4 shadow-lg border-stone-300">
            <span className="text-xl font-semibold text-stone-800">
              Shpping cart
            </span>
            <span className="text-xl font-semibold text-stone-800">
              {mergedData.length} Items
            </span>
          </div>
          <div className="flex flex-col gap-6 py-8">
            <div className="flex px-10 justify-between text-stone-700">
              <span className="w-[100%]">Product List</span>
              <span className="w-1/5 text-center">Quantity</span>
              <span className="w-1/5 text-center">Rate</span>
              <span className="w-1/5 text-center">Price</span>
            </div>
            {mergedData.length === 0 ? (
              <span className="flex flex-col items-center justify-center  text-stone-700 py-16">
                <FaCartShopping size={50} />
                <span>There is no itme in your cart!</span>
              </span>
            ) : (
              mergedData.map((item, index) => {
                return (
                  <div
                    className="flex px-10 justify-center items-center text-stone-700"
                    key={index}
                  >
                    <span className="flex gap-2 w-[100%]">
                      <img
                        src={item.images[0]}
                        alt=""
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span>
                        <div className="text-lg font-semibold">{item.name}</div>
                        <button
                          onClick={() => {
                            handleRemoveItem(item._id);
                          }}
                          className="text-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      </span>
                    </span>
                    <span
                      className="w-1/5 flex h-full gap-2 items-center justify-center"
                      key={item.id}
                    >
                      <button
                        className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                        onClick={() => {
                          handledecreasingQuantity(item._id, item.quantity);
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                        onClick={() => {
                          handleIncreasingQuantity(item._id, item.quantity);
                        }}
                      >
                        +
                      </button>
                    </span>
                    <span className="w-1/5 text-center">₹{item.price}</span>
                    <span className="w-1/5 text-center">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                );
              })
            )}
            <span className="border-t-2"></span>
            <div className="text-right w-[93%] text-xl">Total: ₹{totalAmount}</div>
          </div>
          {mergedData.length !== 0 && (
            <div className="flex py-8 px-12 bg-stone-300 justify-between ">
              <div className="flex gap-2 items-center text-stone-800 hover:scale-110 transition-all duration-300">
                <FaArrowLeftLong />
                <button className="">Continue shopping</button>
              </div>
              <div className="flex gap-2 items-center bg-stone-700 py-3 px-4 text-white rounded hover:scale-110 transition-all duration-300">
                <button className="">Proceed next</button>
                <FaArrowLeftLong className=" rotate-180" />
              </div>
            </div>
          )}
        </main>
      )}

      <Footer />
    </>
  );
};

export default Cart;
