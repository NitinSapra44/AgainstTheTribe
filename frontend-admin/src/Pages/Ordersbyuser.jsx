import React from "react";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
function Ordersbyuser(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [orders,setOrders] = useState([])
    useEffect(()=>{
        axiosInstance.get(`/order/user/${id}`).then((res)=>{
            setOrders(res.data)
        })

    },[id])
return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders for User ID: {id}</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-800">Order ID: <span className="text-sm text-gray-500">{order._id}</span></h2>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <p><strong>Customer:</strong> {order.shippingInfo.fullName}</p>
                <p><strong>Phone:</strong> {order.shippingInfo.phone}</p>
                <p><strong>Email:</strong> {order.shippingInfo.email}</p>
                <p><strong>Address:</strong> {order.shippingInfo.address}</p>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <p><strong>Total Quantity:</strong> {order.totalQuantity}</p>
                <p><strong>Items Price:</strong> ₹{order.itemsPrice}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
                <p>
                  <strong>Paid:</strong>{" "}
                  <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {order.isPaid ? "Yes" : "No"}
                  </span>
                </p>
                {order.isPaid && <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>}
              </div>
              <p className="text-sm">
                <strong>Status:</strong> <span className="font-medium">{order.orderStatus}</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ordersbyuser;