import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const IndexPage = () => {
  const [totalSales, setTotalSales] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/order/info").then((res) => {
      setTotalOrders(res.data.totalOrders);
      setTotalSales(res.data.totalRevenue);
    });

    axiosInstance.get("/user/all").then((res) => {
      setTotalUsers(res.data.length);
    });

    axiosInstance.get("/product/all").then((res) => {
      setTotalProducts(res.data.length);
    });

    axiosInstance.get("/order/bestProducts").then((res) => {
      setBestProducts(res.data);
    });
  }, []);

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Welcome */}
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Welcome, Admin 👋
      </h1>

      {/* Insights */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Sales */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <span className="text-lg text-gray-500">Total Sales</span>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">₹{totalSales}</h3>
          </div>

          {/* Total Orders */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <span className="text-lg text-gray-500">Total Orders</span>
            <h3 className="text-3xl font-bold text-green-600 mt-2">{totalOrders}</h3>
          </div>

          {/* Total Users */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <span className="text-lg text-gray-500">Total Users</span>
            <h3 className="text-3xl font-bold text-purple-600 mt-2">{totalUsers}</h3>
          </div>

          {/* Total Products */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <span className="text-lg text-gray-500">Total Products</span>
            <h3 className="text-3xl font-bold text-red-600 mt-2">{totalProducts}</h3>
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Best Selling Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {bestProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition"
            >
              <img
                src={product.photos[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.category} • {product.gender}
                </p>
                <p className="mt-2 text-blue-600 font-bold">₹{product.price}</p>
                
                <p className="text-sm text-gray-600">Sold: {product.totalSold}</p>
               
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
