import express from "express";
import {
  registerUser,
  loginUser,
  userInfo,
  userLogout,
  getAllUsers,
} from "../controllers/user.js";

const router = express.Router();

// 📝 Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", userLogout);

// 👤 User Info
router.get("/me", userInfo);

// 👥 Admin: Get All Users
router.get("/all", getAllUsers);

export { router };
