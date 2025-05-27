import express from "express";
import {
  adminLogin,
  adminInfo as getAdminInfo,
  adminLogout,
} from "../controllers/admin.js";

const router = express.Router();

// Admin login route
router.post("/login", adminLogin);

// Get currently logged-in admin info
router.get("/UserInfo", getAdminInfo);

// Admin logout route
router.get("/logout", adminLogout);

export { router };
