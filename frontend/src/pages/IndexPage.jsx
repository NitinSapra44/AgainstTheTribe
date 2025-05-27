import React from "react";
import ProductCard from "../components/productCard";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  useEffect(() => {
    axiosInstance.get("/product/home/men").then((res) => {
      setMenProducts(res.data);
    });
    axiosInstance.get("/product/home/women").then((resp) => {
      setWomenProducts(resp.data);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 ">
        <img
          src="/img1.jpeg"
          alt="Outfit 1"
          className="w-full md:w-1/2  shadow-lg"
        />
        <img
          src="/img2.jpeg"
          alt="Outfit 2"
          className="w-full md:w-1/2  shadow-lg"
        />
      </div>
      <div>
        <h1 className="text-5xl p-6 font-bold">Men</h1>
        {menProducts.length === 0 ? (
          <div className="text-center text-gray-600 text-lg font-medium">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
            {menProducts.map((product) => (
              <ProductCard
                id={product._id}
                key={product._id}
                image={product.photos[0]}
                title={product.name}
                Price={product.price}
              />
            ))}
            <div className="col-span-full flex justify-center">
              <button
                onClick={() => {
                  navigate("/men");
                }}
                className="px-4 py-2 bg-black text-white rounded"
              >
                View All
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="py-6">
        <h1 className="text-5xl p-6 font-bold">Women</h1>
        {womenProducts.length === 0 ? (
          <div className="text-center text-gray-600 text-lg font-medium">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
            {womenProducts.map((product) => (
              <ProductCard
                id={product._id}
                key={product._id}
                image={product.photos[0]}
                title={product.name}
                Price={product.price}
              />
            ))}
            <div className="col-span-full flex justify-center">
              <button
                onClick={() => {
                  navigate("/women");
                }}
                className="px-4 py-2 bg-black text-white rounded"
              >
                View All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

