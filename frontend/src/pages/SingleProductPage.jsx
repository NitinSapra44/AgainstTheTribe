import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { useContext } from "react";
import { CartContext } from "../../Context/cartContext";
import { UserContext } from "../../userContext";
import { useNavigate } from "react-router-dom";

function SingleProductPage() {
  const navigate = useNavigate()
  const {addToCart} = useContext(CartContext)
  const {user} = useContext(UserContext)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    axiosInstance
      .post("/product/find-by-id", { id })
      .then((response) => {
        setProduct(response.data);
      });
  }, [id]);

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    setCurrentIndex(isFirst ? product.photos.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLast = currentIndex === product.photos.length - 1;
    setCurrentIndex(isLast ? 0 : currentIndex + 1);
  };

  if (!product || !product.photos) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
      {/* Left: Image Slider */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src={product.photos[currentIndex]}
            className="w-full h-full max-h-[500px] object-contain rounded"
            alt={`Slide ${currentIndex}`}
          />

          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8594;
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.photos.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === idx ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-start space-y-4">
        {/* Product Name */}
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {/* Description */}
        <p className="text-gray-600">{product.description}</p>

        {/* Category & Gender */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">
            Category: {product.category}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            Gender: {product.gender}
          </span>
        </div>

        {/* Price */}
        <div className="text-2xl font-semibold text-green-600">
          ₹{product.price}
        </div>

        {/* Sizes */}
        <div>
          <h2 className="font-semibold mb-2">Available Sizes:</h2>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sizeObj) => (
                <span
                  key={sizeObj.size}
                  onClick={() => setSelectedSize(sizeObj.size)}
                  className={`px-3 py-1 border border-gray-300 rounded text-sm cursor-pointer ${
                  selectedSize === sizeObj.size ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                 }`}
                >
                {sizeObj.size}
                </span>
              ))}

          </div>
        </div>

        {/* Optional: Add to Cart Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => {
            if (!user || !user._id) {
             alert("Please login to add items to cart.");
            navigate("/login") // or use navigate() if you're using react-router-dom v6+
            return;
            }

          if (!selectedSize) {
          alert("Please select a size.");
          return;
          }

          addToCart(product, selectedSize, 1);
          alert("Added to cart!");
          }}
>
  Add to Cart
</button>
      </div>
    </div>
  );
}

export default SingleProductPage;
