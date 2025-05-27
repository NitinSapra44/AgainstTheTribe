import Razorpay from "razorpay";
import mongoose from "mongoose";
import orderSchema from "../models/order.js";
import crypto from "crypto";

const Order = mongoose.model("order", orderSchema);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create a Razorpay payment order
async function razorpayOrder(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return res.status(500).json({ message: "Failed to create Razorpay order" });
  }
}

// Verify payment and place the order
async function razorpayverify(req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Payment verified, save order
    const newOrder = new Order({
      ...orderData,
      isPaid: true,
      paidAt: new Date(),
    });

    await newOrder.save();

    return res.status(200).json({ message: "Payment verified and order placed" });
  } catch (err) {
    console.error("Razorpay Verification Error:", err);
    return res.status(500).json({ message: "Payment verification failed" });
  }
}

export { razorpayOrder, razorpayverify };
