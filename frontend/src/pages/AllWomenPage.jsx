import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import ProductCard from "../components/productCard";

function AllWomenPage() {
  const [womenItems, setWomenItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/product/women") // ✅ updated route
      .then((response) => {
        setWomenItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching women products:", error);
        setLoading(false);
      });

    return () => {
      setWomenItems([]);
      setLoading(true);
    };
  }, []);

  return (
    <div className="flex flex-col px-4 py-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        All Women's Products
      </h1>

      <div className="flex justify-center">
        {loading ? (
          <div className="text-center text-gray-600 text-lg font-medium">
            Loading...
          </div>
        ) : womenItems.length === 0 ? (
          <div className="text-center text-gray-600 text-lg font-medium">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            {womenItems.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.photos[0]}
                title={product.name}
                Price={product.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllWomenPage;
