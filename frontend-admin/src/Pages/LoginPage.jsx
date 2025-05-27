import { useState } from "react";
import axiosInstance from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext.jsx";
import { useContext } from "react";

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = { name, password };
      const res = await axiosInstance.post("/login", data);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert("Request was made but no response received.");
      } else {
        alert("Something went wrong");
      }
      navigate("/login");
      setName("");
      setPassword("");
    }

    // handle actual login here
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-lg px-10 py-12 w-[600px] max-w-full"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Login
        </h2>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin"
            required
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
