import mongoose from "mongoose";
import productSchema from "../models/product.js";

const Product = mongoose.model("product", productSchema);

// Upload Image
async function handleImageUpload(req, res) {
  try {
    const fileNames = req.files.map(file => file.path);
    res.status(200).json({ fileNames });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
}

// Add Product
async function handleProductAdd(req, res) {
  try {
    const { name, category, gender, description, price, sizes, photos } = req.body;
    const newProduct = new Product({ name, category, gender, description, price, sizes, photos });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
}

// Get All Products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
}

// Get Single Product Info
async function getProductInfo(req, res) {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product info", error: err.message });
  }
}

// Update Product
async function handleProductUpdate(req, res) {
  try {
    const { id, ...updatedData } = req.body;
    await Product.replaceOne({ _id: id }, updatedData);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
}

// Delete Product
async function handleProductDelete(req, res) {
  try {
    const { id } = req.body;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
}

// Homepage Products
async function homepagemenproducts(req, res) {
  try {
    const products = await Product.find({ gender: "Men" }).limit(4);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch men's products", error: err.message });
  }
}

async function homepagewomenproducts(req, res) {
  try {
    const products = await Product.find({ gender: "Men", category: "Bottomwear" }).limit(4); // Check if 'Men' is intentional
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch women's products", error: err.message });
  }
}

// Filtered Products
async function getAllMenProducts(req, res) {
  try {
    const products = await Product.find({ gender: "Men" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch men's products", error: err.message });
  }
}

async function getAllWomenProducts(req, res) {
  try {
    const products = await Product.find({ gender: "Women" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch women's products", error: err.message });
  }
}

async function getAllMenTopwear(req, res) {
  try {
    const products = await Product.find({ gender: "Men", category: "Topwear" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch men's topwear", error: err.message });
  }
}

async function getAllMenBottomwear(req, res) {
  try {
    const products = await Product.find({ gender: "Men", category: "Bottomwear" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch men's bottomwear", error: err.message });
  }
}

async function getAllWomenTopwear(req, res) {
  try {
    const products = await Product.find({ gender: "Women", category: "Topwear" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch women's topwear", error: err.message });
  }
}

async function getAllWomenBottomwear(req, res) {
  try {
    const products = await Product.find({ gender: "Women", category: "Bottomwear" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch women's bottomwear", error: err.message });
  }
}

// Find Product by ID
async function findProductbyID(req, res) {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to find product", error: err.message });
  }
}

export {
  handleImageUpload,
  handleProductAdd,
  getAllProducts,
  getProductInfo,
  handleProductUpdate,
  handleProductDelete,
  homepagemenproducts,
  homepagewomenproducts,
  getAllMenProducts,
  getAllWomenProducts,
  getAllMenTopwear,
  getAllMenBottomwear,
  getAllWomenTopwear,
  getAllWomenBottomwear,
  findProductbyID,
};
