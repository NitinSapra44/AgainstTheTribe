import express from "express";
import {
  placeOrder,
  getUserOrders,
  orderSummary,
  cancelOrder,
  getAllOrders,
  changeOrderStatus,
  allOrders,
  bestProducts,
} from "../controllers/order.js";

const router = express.Router();

// User routes
router.post("/placeOrder", placeOrder);
router.post("/order-summary", orderSummary);
router.post("/cancel-order", cancelOrder);
router.get("/user/:id", getUserOrders);

// Admin routes
router.get("/", getAllOrders); // All orders (maybe paginated)
router.get("/info", allOrders); // Possibly summary/analytics
router.post("/status", changeOrderStatus); // Change status (e.g., shipped, delivered)
router.get("/bestProducts", bestProducts); // Analytics - best selling products

export { router };
