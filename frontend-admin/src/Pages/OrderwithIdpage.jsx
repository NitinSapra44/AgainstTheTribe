import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

function Orderidpage() {
    const navigate = useNavigate()
    const {id} = useParams()
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.post("/order/order-summary",{id})
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);


  const updateOrderStatus = async (orderId, newStatus) => {
    try {
       const data = { id : orderId , status : newStatus}  
      const res = await axiosInstance.post(`/order/status`,data);
           alert("Status Updated")
           navigate("/orders")

    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order</h2>
       
        <div className="space-y-6">
          
            <div
              key={order._id}
              className="border border-gray-300 p-5 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
              <p><strong>Customer:</strong> {order.shippingInfo.fullName}</p>
              <p><strong>Email:</strong> {order.shippingInfo.email}</p>
              <p><strong>Phone:</strong> {order.shippingInfo.phone}</p>
              <p><strong>Address:</strong> {order.shippingInfo.address}</p>
              <p><strong>Status:</strong> <span className="font-medium text-blue-600">{order.orderStatus}</span></p>
              <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()} | {order.isPaid ? "Paid" : "Not Paid"}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <div className="mt-4">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                  {order.cartItems.map((item) => (
                    <li key={item._id} className="mt-2">
                      <div className="flex items-center gap-4">
                        <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p>{item.name} (Size: {item.size})</p>
                          <p>₹{item.price} x {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => updateOrderStatus(order._id, "Shipped")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => updateOrderStatus(order._id, "Delivered")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          
        </div>
      
    </div>
  );
}

export default Orderidpage;
