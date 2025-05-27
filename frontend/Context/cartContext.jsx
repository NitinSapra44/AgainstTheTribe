import React from "react";
import { useState,useEffect } from "react";
import { createContext } from "react";

export const CartContext = createContext();

const CartState = (props)=>{
    const [cartItems, setCartItems] = useState([]);
  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (product, size, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product._id && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          photo: product.photos[0],
          size,
          quantity,
        },
      ];
    });
  };

    const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

   return (
      <CartContext.Provider value={{cartItems,addToCart,removeFromCart,updateQuantity ,clearCart}}>
        {" "}
        {props.children}{" "}
      </CartContext.Provider>
    );
};

export default CartState