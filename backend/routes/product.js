import express from "express";
import upload from "../multerConfig.js";
import {
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
} from "../controllers/product.js";

const router = express.Router();

// 🖼️ Image Upload
router.post("/photo-upload", upload.array("photos"), handleImageUpload);

// 🛠️ Product CRUD
router.post("/add", handleProductAdd);
router.get("/all", getAllProducts);
router.post("/info", getProductInfo);
router.post("/update", handleProductUpdate);
router.post("/delete", handleProductDelete);
router.post("/find-by-id", findProductbyID);

// 🏠 Homepage Sections
router.get("/home/men", homepagemenproducts);
router.get("/home/women", homepagewomenproducts);

// 👕 Filtered Categories
router.get("/men", getAllMenProducts);
router.get("/men/topwear", getAllMenTopwear);
router.get("/men/bottomwear", getAllMenBottomwear);
router.get("/women", getAllWomenProducts);
router.get("/women/topwear", getAllWomenTopwear);
router.get("/women/bottomwear", getAllWomenBottomwear);

export { router };
