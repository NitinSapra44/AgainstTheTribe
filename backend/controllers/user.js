import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userSchema from "../models/user.js";
import { TokenMakerforUser, TokenExtractor } from "../token.js";

const User = mongoose.model("user", userSchema);

// Register a new user
async function registerUser(req, res) {
  const { email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, name, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", detail: error.message });
  }
}

// Login user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = TokenMakerforUser(foundUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: { email: foundUser.email, name: foundUser.name },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", detail: error.message });
  }
}

// Get logged-in user's info from token
async function userInfo(req, res) {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("No token found");

    const user = TokenExtractor(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized. Please log in." });
  }
}

// Logout user
async function userLogout(req, res) {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "User logged out successfully" });
}

// Admin: Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
}

export {
  registerUser,
  loginUser,
  userInfo,
  userLogout,
  getAllUsers,
};
