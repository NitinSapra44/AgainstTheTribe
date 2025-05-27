import React, { useState } from "react";
import axiosInstance from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return; // stop form submission
    }

    const data = { email, name, password };

    try {
      const response = await axiosInstance.post("/user/register", data); // await the call
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      // Show error from server or a generic fallback
      const errorMsg =
        error.response?.data?.error || "Registration failed. Try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="UserName"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/Login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
