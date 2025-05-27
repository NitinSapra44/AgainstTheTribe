import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

import adminSchema from "../models/admin.js";
import { TokenMaker, TokenExtractor } from "../token.js";

const Admin = mongoose.model("Admin", adminSchema);

// Admin Login
async function adminLogin(req, res) {
  const { name, password } = req.body;

  try {
    const adminDoc = await Admin.findOne({ username: name });

    if (!adminDoc) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, adminDoc.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = TokenMaker(adminDoc);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Consider setting true in production with HTTPS
      sameSite: "Lax",
    });

    return res.status(200).json({ message: "Login successful", admin: adminDoc });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetch Admin Info from Token
async function adminInfo(req, res) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    const user = TokenExtractor(token);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Info Error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Logout Admin
async function adminLogout(req, res) {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      expires: new Date(0),
    })
    .json({ message: "User logged out successfully" });
}

export { adminLogin, adminInfo, adminLogout };
