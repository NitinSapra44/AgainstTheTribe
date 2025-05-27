import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext.jsx";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

function Orders() {
    const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  if (user?._id) {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        console.log("Fetching orders for user ID:", user._id);
        const response = await axiosInstance.get(`/order/user/${user._id}`, {
          withCredentials: true, // if your backend needs credentials
        });
        console.log("Orders fetched:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }
}, [user]);


  if (!user) return <div className="text-center py-6">Loading user info...</div>;
  if (loading) return <div className="text-center py-6">Loading orders...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Hello, {user.name || "User"}! Here are your orders:</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6  ">
          {orders.map((order) => (
            <div onClick={()=>{
                navigate(`/order/${order._id}`)
            }} key={order._id} className="bg-white shadow-md rounded-xl p-6 cursor-pointer border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.orderStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Shipping Info:</p>
                  <p>{order.shippingInfo.fullName}</p>
                  <p>{order.shippingInfo.email}</p>
                  <p>{order.shippingInfo.phone}</p>
                  <p>{order.shippingInfo.address}</p>
                </div>

                <div>
                  <p className="font-medium">Payment:</p>
                  <p>Method: {order.paymentMethod.toUpperCase()}</p>
                  <p>
                    Paid:{" "}
                    <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                      {order.isPaid ? "Yes" : "No"}
                    </span>
                  </p>
                  {order.paidAt && <p>Paid At: {new Date(order.paidAt).toLocaleString()}</p>}
                </div>

                <div>
                  <p className="font-medium">Items:</p>
                  <p>Quantity: {order.totalQuantity}</p>
                  <p>Total: ₹{order.itemsPrice}</p>
                </div>

                <div>
                  <p className="font-medium">Placed On:</p>
                  <p>{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
