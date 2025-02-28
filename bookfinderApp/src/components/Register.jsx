import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("It's coming here");
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md"
      >
        <motion.h2
          variants={childVariants}
          className="text-2xl mb-4 text-center font-bold text-gray-800 dark:text-white"
        >
          Register
        </motion.h2>

        {error && (
          <motion.p
            variants={childVariants}
            className="text-red-500 mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div variants={childVariants} className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div variants={childVariants} className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 shadow-sm"
          >
            Register
          </motion.button>
        </form>

        <motion.p
          variants={childVariants}
          className="mt-4 text-center text-gray-600 dark:text-gray-300"
        >
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
          >
            Login
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;
