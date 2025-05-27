import React, { useContext } from "react";
import { CartContext } from "../../Context/cartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    navigate("/checkout");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-xl shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.name}{" "}
                      <span className="text-sm text-gray-500">({item.size})</span>
                    </h3>
                    <p className="text-gray-700 font-medium">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, item.size, +e.target.value)
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <div className="text-right mt-8">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
