import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    gender: String,
    description: String,
    price: Number,
    sizes: [
      {
        size: String, // e.g., "M"
        quantity: Number, // e.g., 25
      },
    ],
    photos: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export default productSchema;
