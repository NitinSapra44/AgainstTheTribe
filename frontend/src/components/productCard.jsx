import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, Price }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/product/${id}`);
      }}
      className="max-w-xs bg-white shadow-md rounded-md overflow-hidden"
    >
      <img src={image} alt={title} className="w-full object-cover" />

      <div className="p-4">
        <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">
          New
        </span>

        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-black">Rs. {Price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
