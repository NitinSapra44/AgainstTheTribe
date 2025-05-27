import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import axiosInstance from "../../axiosInstance";

function Navbar() {
  const { user, setUser,ready } = useContext(UserContext);
  const navigate = useNavigate();

  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = useState(false);
  const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false);

  const menRef = useRef(null);
  const womenRef = useRef(null);
  const policyRef = useRef(null);
  const userRef = useRef(null);

  const toggleMenDropdown = () => {
    setIsMenDropdownOpen((prev) => !prev);
    setIsWomenDropdownOpen(false);
    setIsPolicyDropdownOpen(false);
    setIsUserDropDownOpen(false);
  };
  const toggleWomenDropdown = () => {
    setIsWomenDropdownOpen((prev) => !prev);
    setIsMenDropdownOpen(false);
    setIsPolicyDropdownOpen(false);
    setIsUserDropDownOpen(false);
  };
  const togglePolicyDropdown = () => {
    setIsPolicyDropdownOpen((prev) => !prev);
    setIsMenDropdownOpen(false);
    setIsWomenDropdownOpen(false);
    setIsUserDropDownOpen(false);
  };
  const toggleUserDropdown = () => {
    setIsUserDropDownOpen((prev) => !prev);
    setIsMenDropdownOpen(false);
    setIsWomenDropdownOpen(false);
    setIsPolicyDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menRef.current && !menRef.current.contains(event.target)) {
        setIsMenDropdownOpen(false);
      }
      if (womenRef.current && !womenRef.current.contains(event.target)) {
        setIsWomenDropdownOpen(false);
      }
      if (policyRef.current && !policyRef.current.contains(event.target)) {
        setIsPolicyDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropDownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    axiosInstance.get("/user/userlogout").then((response) => {
      alert(response.data.message);
      setUser(null);
      navigate("/");
    });
  }

  if(!ready) return null
  return (
    <div className="flex flex-row items-center justify-between border relative">
      {/* Logo */}
      <div className="px-4">
        <img
          onClick={() => navigate("/")}
          src="/att logo.jpg"
          alt="logo"
          className="w-32 h-32 cursor-pointer object-contain mb-2"
        />
      </div>

      {/* Nav Items */}
      <div className="flex flex-row gap-6 relative">
        <p onClick={() => navigate("/")} className="font-bold text-xl cursor-pointer">
          Home
        </p>

        {/* Men Dropdown */}
        <div className="relative" ref={menRef}>
          <p onClick={toggleMenDropdown} className="font-bold text-xl cursor-pointer">
            Men
          </p>
          {isMenDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              <p onClick={() => navigate("/men/topwear")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Topwear
              </p>
              <p onClick={() => navigate("/men/bottomwear")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Bottomwear
              </p>
              <p onClick={() => navigate("/men")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                All Products
              </p>
            </div>
          )}
        </div>

        {/* Women Dropdown */}
        <div className="relative" ref={womenRef}>
          <p onClick={toggleWomenDropdown} className="font-bold text-xl cursor-pointer">
            Women
          </p>
          {isWomenDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              <p onClick={() => navigate("/women/topwear")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Topwear
              </p>
              <p onClick={() => navigate("/women/bottomwear")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Bottomwear
              </p>
              <p onClick={() => navigate("/women")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                All Products
              </p>
            </div>
          )}
        </div>

        <p onClick={() => navigate("/aboutus")} className="font-bold text-xl cursor-pointer">
          About Us
        </p>

        {/* Policies Dropdown */}
        <div className="relative" ref={policyRef}>
          <p onClick={togglePolicyDropdown} className="font-bold text-xl cursor-pointer">
            Policies
          </p>
          {isPolicyDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              <p onClick={() => navigate("/policy/shippingandreturnpolicy")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Shipping & Return Policy
              </p>
              <p onClick={() => navigate("/policy/termsofservice")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Terms Of Service
              </p>
              <p onClick={() => navigate("/policy/privacypolicy")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Privacy Policy
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Dropdown */}
      <div className="pr-5">
        <div className="relative" ref={userRef}>
          <p onClick={toggleUserDropdown} className="font-bold text-xl cursor-pointer flex items-center gap-1">
            {user ? (
              <span className="text-lg font-semibold">{user.name}</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
          </p>
          {isUserDropDownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              {user ? (
                <>
                  <p onClick={() => navigate("/orders")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Orders
                  </p>
                  <p onClick={() => navigate("/cart")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Cart
                  </p>
                  <p onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <p onClick={() => navigate("/login")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Login
                  </p>
                  <p onClick={() => navigate("/register")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Register
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
