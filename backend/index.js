import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Route Imports
import { router as adminRouter } from "./routes/admin.js";
import { router as productRouter } from "./routes/product.js";
import { router as userRouter } from "./routes/user.js";
import { router as orderRouter } from "./routes/order.js";
import { router as paymentRouter } from "./routes/payment.js";

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
mongoose
  .connect(process.env.mongo_url)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/", adminRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

// Port & Server Start
const PORT = process.env.Port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
