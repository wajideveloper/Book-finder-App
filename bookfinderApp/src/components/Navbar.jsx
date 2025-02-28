import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`p-4 flex justify-between items-center shadow-md sticky top-0 z-10 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-500"
      }`}
    >
      <motion.h1
        variants={linkVariants}
        className="text-2xl font-bold flex justify-center items-center space-x-2 "
      >
        <img
          src="./LitSphere1.jpeg" // Path to logo in public folder
          alt="LitSphere Logo"
          className="h-20 w-20 object-contain rounded-[50%]" // Adjust size as needed
        />
        <Link
          to="/"
          className={`${
            theme === "dark" ? "text-white" : "text-gray-800"
          } hover:text-blue-500 transition-colors duration-300`}
        >
          LitSphere
        </Link>
      </motion.h1>

      <div className="flex justify-center flex-grow">
        <SearchBar />
      </div>

      <nav className="flex items-center space-x-6">
        {user ? (
          <>
            <motion.div variants={linkVariants}>
              <Link
                to="/favorites"
                className={`flex items-center space-x-1 ${
                  theme === "dark" ? "text-gray-200" : "text-black"
                } hover:text-blue-400 transition-colors duration-300`}
              >
                <FaHeart className="text-red-500" />
                <span>Favorites</span>
              </Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link
                to="/createBooks"
                className={`${
                  theme === "dark" ? "text-gray-200" : "text-black"
                } hover:text-blue-400 transition-colors duration-300`}
              >
                Add Book
              </Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <button
                onClick={logout}
                className={`${
                  theme === "dark" ? "text-red-400" : "text-red-600"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Logout
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={linkVariants}>
              <Link
                to="/login"
                className={`${
                  theme === "dark" ? "text-gray-200" : "text-blue-600"
                } hover:text-blue-400 transition-colors duration-300`}
              >
                Login
              </Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link
                to="/register"
                className={`${
                  theme === "dark" ? "text-gray-200" : "text-blue-600"
                } hover:text-blue-400 transition-colors duration-300`}
              >
                Register
              </Link>
            </motion.div>
          </>
        )}
        <motion.div variants={linkVariants}>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition-colors duration-300 shadow-sm`}
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
