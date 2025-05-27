import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
function SingleOrderSummary() {
    const navigate = useNavigate()
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .post("/order/order-summary", { id })
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load order details.");
        setLoading(false);
      });
  }, [id]);

  async function CancelOrder(){
    try {
    const response = await axiosInstance.post("/order/cancel-order", { id });
    if (response.data.success) {
      alert("Order cancelled successfully.");
      navigate("/orders"); // redirect or refresh if needed
    } else {
      alert("Failed to cancel order.");
    }
  } catch (error) {
    alert("An error occurred while cancelling the order.");
  }
    
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>

      {/* Shipping Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Shipping Info</h3>
        <p><span className="font-medium">Name:</span> {order.shippingInfo.fullName}</p>
        <p><span className="font-medium">Phone:</span> {order.shippingInfo.phone}</p>
        <p><span className="font-medium">Email:</span> {order.shippingInfo.email}</p>
        <p><span className="font-medium">Address:</span> {order.shippingInfo.address}</p>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-xl">
          <p><span className="font-medium">Payment Method:</span> {order.paymentMethod.toUpperCase()}</p>
          <p><span className="font-medium">Status:</span> {order.orderStatus}</p>
          <p><span className="font-medium">Paid:</span> {order.isPaid ? "Yes" : "No"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p><span className="font-medium">Items Total:</span> ₹{order.itemsPrice}</p>
          <p><span className="font-medium">Total Quantity:</span> {order.totalQuantity}</p>
          <p><span className="font-medium">Date:</span> {format(new Date(order.createdAt), "PPPpp")}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Cart Items</h3>
        <div className="space-y-4">
          {order.cartItems.map((item) => (
            <div onClick={()=>{
                navigate(`/product/${item.productId}`)
            }}  key={item._id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl cursor-pointer shadow-sm">
              <img src={item.photo} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
    
      </div>
      
{order.orderStatus !== "Cancelled" && (
  <div>
    <button
      onClick={CancelOrder}
      className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
    >
      Cancel Order
    </button>
  </div>
)}

    </div>
  );
}

export default SingleOrderSummary;
