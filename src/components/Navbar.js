import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-indigo-600 to-indigo-400 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {}
        <div className="flex items-center space-x-3">
          <img
            src="https://image.freepik.com/free-vector/pets-shop-logo-with-dog-cat-parrot-illustration_162786-75.jpg" 
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-white text-3xl font-extrabold tracking-wide">
            PetShop JMB
          </h1>
        </div>

       
        <div className="flex items-center space-x-8">
          <Link
            to="/Home"
            className="text-white text-lg font-medium hover:text-indigo-200 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white text-lg font-medium hover:text-indigo-200 transition-all duration-300"
          >
            Products
          </Link>
          <Link
            to="/purchases"
            className="text-white text-lg font-medium hover:text-indigo-200 transition-all duration-300"
          >
            Purchases
          </Link>
          <Link
            to="/history"
            className="text-white text-lg font-medium hover:text-indigo-200 transition-all duration-300"
          >
            History
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
