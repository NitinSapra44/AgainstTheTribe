import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
function OrdersPage() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get("/order/")
      .then((res) => {
        setAllOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {allOrders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="space-y-4">
          {allOrders.map((order) => (
            <div onClick={()=>{navigate(`/order/${order._id}`)}} key={order._id || order.id} className="border p-4 cursor-pointer rounded shadow">
              <p><strong>Order ID:</strong> {order._id || order.id}</p>
              <p><strong>Customer:</strong> {order.shippingInfo.fullName}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Total:</strong> ₹{order.itemsPrice}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
