import React, { useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import imgPlaceholder from "../assets/img/img-placeholder.jpeg";
import axios from "axios";
import { v4 } from "uuid";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Remaining Tasks:
// 1: Add loading screen!
// 2: Discard button function

const AddProduct = () => {
  const count = useSelector((state) => state.counter);
  const [productData, setProductData] = useState({ reviews: 0 });

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
  const [imageList, setImageList] = useState([]);
  const [imgvalidationErr, setImgValidationErr] = useState(false);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  const backendUrl = useSelector((state) => state.backendUrlSlice);

  const handleDeleteImg = (index) => {
    const updatedImageList = imageList.filter((v, i) => i !== index);
    setImageList(updatedImageList);
  };
  const addProductUrl = `${backendUrl}/add-product`;
  const webGetItem = "https://shoegle-production.up.railway.app/add-product";

  const handleUpload = async () => {
    const uploadPromises = imageList.map((image) => {
      const imageRef = ref(
        storage,
        `images/${productName}/${image.name + v4()}`
      );
      return uploadBytes(imageRef, image).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });

    // Wait for all image uploads to complete
    return Promise.all(uploadPromises);
  };
  const [loading, setLoading] = useState(false);
  const handleAddData = async () => {
    try {
      setLoading(true);
      const uploadedImageUrls = await handleUpload();
      const data = await axios.post(addProductUrl, {
        ...productData,
        images: uploadedImageUrls,
        quantity: 1
      });
      console.log("Product added successfully: ", data.data);
      setProductId(data.data._id);
      setImageList([]);
      setLoading(false);
    } catch (err) {
      console.log("Error on adding product", err.message);
    }
  };

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
        <main className="pl-12 flex flex-col gap-8 py-8">
          <div className="flex items-center gap-4 text-stone-800">
            <Link to={"/"} title="Home">
              <FaArrowLeftLong />
            </Link>
            <span className="text-lg font-semibold">Add new product</span>
          </div>
          <div className="w-3/5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="product-name">Add product name</label>
              <input
                type="text"
                id="product-name"
                className="border border-stone-600 rounded focus:outline-none"
                onChange={(e) => {
                  setProductData((prev) => ({
                    ...productData,
                    name: e.target.value,
                  }));
                  setProductName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Product description</label>
              <textarea
                aria-label="description"
                id="description"
                rows="5"
                className="border border-stone-600 rounded focus:outline-none"
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...productData,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Product price in ruppee</label>
              <input
                type="text"
                id="price"
                className="border border-stone-600 rounded focus:outline-none"
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...productData,
                    price: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-2">
                <span>Product Images (Max - 4)</span>
                {imgvalidationErr && (
                  <span className="text-red-500 font-semibold text-sm">
                    Max image is only 4!
                  </span>
                )}
                <label
                  htmlFor="image"
                  className="flex flex-col gap-2 items-center justify-center border-2 border-dotted border-stone-600 rounded w-[12rem] h-[10rem] font-semibold text-sm cursor-pointer text-sky-600"
                >
                  <img
                    src={imgPlaceholder}
                    alt=""
                    className="w-10 object-cover "
                  />
                  <span>Click to upload</span>
                </label>

                <input
                  type="file"
                  id="image"
                  className=" hidden"
                  onChange={(e) => {
                    setImageList((prev) => {
                      if (e.target.files[0] !== undefined) {
                        if (prev.length < 4) {
                          return [...prev, e.target.files[0]];
                        } else {
                          setImgValidationErr(true);
                        }
                      }
                      return prev;
                    });
                  }}
                />
              </div>
              {imageList.length ? (
                <div className=" grid grid-cols-2 gap-4 h-[10rem] w-[12rem]">
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="overflow-hidden relative rounded"
                    >
                      <button
                        className="absolute top-1 right-1 text-red-500"
                        onClick={() => handleDeleteImg(index)}
                      >
                        <MdDelete />
                      </button>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="object-cover rounded aspect-square"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[10rem] w-[12rem] border border-stone-600 rounded">
                  <span className=" text-xs">No images available</span>
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded text-sm"
                onClick={handleAddData}
              >
                Add product
              </button>
              <Link to={"/"}>
                <button className="text-red-500 font-medium">Discard</button>
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default AddProduct;
