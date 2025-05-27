import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/cartContext";
import { UserContext } from "../../userContext.jsx";
import axiosInstance from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const productSum = (a, b) => a * b;

  async function handleSubmit(ev) {
    ev.preventDefault();

    const shippingInfo = { fullName, phone, email, address };

    if (paymentMethod === "cod") {
      try {
        const res = await axiosInstance.post("/order/placeOrder", {
          user: user?._id,
          cartItems,
          shippingInfo,
          paymentMethod,
          itemsPrice,
          totalQuantity,
        });
        alert(res.data.message);
        clearCart();
        navigate("/");
      } catch (err) {
        alert("Order failed: " + (err.response?.data?.message || err.message));
        navigate("/");
      }
    } else if (["upi", "card", "netbanking"].includes(paymentMethod)) {
      try {
        const createOrder = await axiosInstance.post("/payment/razorpay-order", {
          amount: itemsPrice * 100,
        });

        const { orderId, amount, currency } = createOrder.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount,
          currency,
          name: "My Store",
          description: "Test Order",
          order_id: orderId,
          prefill: { name: fullName, email, contact: phone },
          handler: async function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            await axiosInstance.post("/payment/verify", {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderData: {
                user: user?._id,
                cartItems,
                shippingInfo,
                paymentMethod,
                itemsPrice,
                totalQuantity,
              },
            });

            alert("Payment successful & Order placed!");
            clearCart();
            navigate("/");
          },
          theme: { color: "#0d9488" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        alert("Payment initiation failed: " + err.message);
        navigate("/");
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Checkout</h2>

      {/* Cart Summary */}
      {cartItems.map((item) => (
        <div
          key={`${item.productId}-${item.size}`}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 mb-4 bg-white rounded-xl shadow"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.photo}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {item.name} <span className="text-sm text-gray-500">({item.size})</span>
              </h3>
              <p className="text-gray-700 font-medium">₹{item.price}</p>
            </div>
          </div>
          <div className="text-sm font-medium">Qty: {item.quantity}</div>
          <div>
            <span className="inline-block px-4 py-2 text-sm bg-teal-100 text-teal-800 rounded-md font-semibold">
              ₹{productSum(item.price, item.quantity)}
            </span>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 p-4 bg-gray-100 rounded-xl flex justify-between text-lg font-semibold">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ₹{itemsPrice}</p>
      </div>

      {/* Shipping Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h3 className="text-2xl font-bold mb-4">Shipping Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Shipping Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123, Main Street, City, State - Pincode"
              rows="3"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a payment method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
              <option value="netbanking">Net Banking</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
