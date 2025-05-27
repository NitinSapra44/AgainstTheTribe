import express from "express";
import { razorpayOrder, razorpayverify } from "../controllers/payment.js";

const router = express.Router();

// Route to create a Razorpay order
router.post("/razorpay-order", razorpayOrder);

// Route to verify Razorpay payment signature
router.post("/verify", razorpayverify);

export { router };
