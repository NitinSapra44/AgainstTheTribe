import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../userContext.jsx";
import axiosInstance from "../../axiosInstance.js";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function userLogout() {
    axiosInstance.get("/logout").then((Response) => {
      alert(Response.data.message);
      navigate("/");
      setUser("");
    });
  }

  function SidebarItem({ label, page }) {
    return (
      <div className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition duration-200">
        <Link to={`/${page}`} className="text-lg font-medium text-gray-800">
          {label}
        </Link>
      </div>
    );
  }
  return (
    <div className="w-1/6 bg-white px-4 py-8 flex flex-col justify-between items-center h-screen shadow-md border-r">
      {/* Logo Section */}
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-col items-center w-full cursor-pointer border rounded-xl shadow-sm p-4"
      >
        <img
          src="/att logo.jpg"
          alt="logo"
          className="w-16 h-16 object-contain mb-2"
        />
        <p className="text-center font-semibold text-sm text-gray-700">
          Against The Tribe
        </p>
      </div>

      {user && (
        <div className="flex flex-col items-center gap-4">
          <SidebarItem label="USERS" page="users" />
          <SidebarItem label="PRODUCTS" page="products" />
          <SidebarItem label="ORDERS" page="orders" />
         
        </div>
      )}

      {user ? (
        <div className="flex flex-row gap-5">
          <div className="text-gray-600 text-sm font-medium">
            <span className="font-semibold">{user.username}</span>
          </div>
          <div className="text-gray-600 text-sm font-medium">
            <button
              onClick={() => {
                userLogout();
              }}
              className="font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-600 text-sm font-medium">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="font-semibold"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
