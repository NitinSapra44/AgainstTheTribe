import React, { useState } from "react";
import axiosInstance from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../userContext.jsx";
import { useContext } from "react";
const LoginPage = () => {
  
  const {setUser,user,setReady} = useContext(UserContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const data = { email, password };
      const response = await axiosInstance.post("/user/login", data);
       alert(response.data.message);
      setUser(response.data.user)
      setReady(true)
      navigate("/");
     
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
