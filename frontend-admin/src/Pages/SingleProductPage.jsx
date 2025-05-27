import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [product, setProduct] = useState("");

  useEffect(() => {
    const data = { id };
    axiosInstance.post("/product/info", data).then((response) => {
      const prod = response.data;
      setProduct(prod);
      setName(prod.name);
      setCategory(prod.category);
      setGender(prod.gender);
      setDescription(prod.description);
      setPrice(prod.price);
      setSizes(prod.sizes);
      setImagePreviews(prod.photos || []);
      setImages(prod.photos || []);
    });
  }, [id]);

  const handleAddSizeQty = () => {
    if (sizeInput && qtyInput) {
      setSizes([...sizes, { size: sizeInput, quantity: qtyInput }]);
      setSizeInput("");
      setQtyInput("");
    }
  };

  const handleRemoveSizeQty = (index) => {
    const updated = [...sizes];
    updated.splice(index, 1);
    setSizes(updated);
  };

  async function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files;
    const data = new FormData();

    for (let i = 0; i < file.length; i++) {
      data.append("photos", file[i]);
    }

    const response = await axiosInstance.post("/product/photo-upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const newPhotos = response.data.fileNames;

    setImagePreviews((prev) => [...prev, ...newPhotos]);
  }

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  async function handleUpdate(e) {
    e.preventDefault();
    const data = {
      id,
      name,
      category,
      gender,
      description,
      price,
      sizes,
      photos: imagePreviews,
    };
    const response = await axiosInstance.post(
      "/product/update",
      data
    );

    alert(response.data.message);
    navigate("/products");
  }

  async function handleDelete(e) {
    const data = {
      id,
    };
    const response = await axiosInstance.post(
      "/product/delete",
      data
    );

    alert(response.data.message);
    navigate("/products");
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
        </select>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Size & Quantity */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Size"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Qty"
          value={qtyInput}
          onChange={(e) => setQtyInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={handleAddSizeQty}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-1">
        {sizes.map((sq, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
          >
            <span>
              {sq.size.toUpperCase()} - {sq.quantity}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveSizeQty(index)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* Image Upload */}
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <div className="flex flex-wrap gap-4 mt-2">
        {imagePreviews.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
      >
        Update Product
      </button>
      <button
        onClick={() => {
          handleDelete();
        }}
        type="button"
        className="w-full py-3 mt-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
      >
        Delete Product
      </button>
    </form>
  );
};

export default EditProductForm;
