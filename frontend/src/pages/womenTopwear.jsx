import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard.jsx";

function WomenTopwear() {
    const [womenTopwearItems, setWomenTopwearItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get("/product/women/topwear").then((response) => {
            setWomenTopwearItems(response.data);
            setLoading(false);
        
        }
        ).catch((error) => {
            setLoading(false);
        })
        return () => {
            setWomenTopwearItems([]);
            setLoading(true);
        }
    }
    , [])
    return(
        <div className="flex flex-col p-6">
        <h1 className="text-5xl font-bold p-4 mb">Topwear</h1>
        <div className="flex flex-col p-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 ">
                {loading ? (
                    <div className="text-center text-gray-600 text-lg font-medium">
                        Loading...
                    </div>
                ) : womenTopwearItems.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg font-medium">
                        No products available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
                        {womenTopwearItems.map((product) => (
                            <ProductCard
                                id={product._id}
                                key={product._id}
                                image={product.photos[0]}
                                title={product.name}
                                Price={product.price}
                            />
                        ))}
                    </div>
                )}
            </div>
        
        </div> </div>   )
}

export default WomenTopwear;