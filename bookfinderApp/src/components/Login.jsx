import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TextInput, Button, Paper, Title, Text, Center } from "@mantine/core";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Center className="min-h-screen bg-gradient-to-br from-gray-600 to-blue-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Paper
          shadow="md"
          radius="lg"
          className="p-8 bg-white bg-opacity-90 backdrop-blur-md border border-gray-200"
        >
          <motion.div variants={childVariants}>
            <Title
              order={2}
              className="text-3xl font-bold text-gray-800 text-center mb-6"
            >
              Login
            </Title>
          </motion.div>

          {error && (
            <motion.div variants={childVariants}>
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div variants={childVariants}>
              <TextInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-6"
                placeholder="Enter your email"
                radius="md"
                inputWrapperOrder={["label", "input", "description", "error"]}
                styles={{
                  input: {
                    border: "1px solid #e5e7eb",
                    padding: "8px 12px",
                    "&:focus": { borderColor: "#3b82f6" },
                  },
                  label: { color: "#374151", fontWeight: 500 },
                }}
              />
            </motion.div>

            <motion.div variants={childVariants}>
              <TextInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-6"
                placeholder="Enter your password"
                radius="md"
                inputWrapperOrder={["label", "input", "description", "error"]}
                styles={{
                  input: {
                    border: "1px solid #e5e7eb",
                    padding: "8px 12px",
                    "&:focus": { borderColor: "#3b82f6" },
                  },
                  label: { color: "#374151", fontWeight: 500 },
                }}
              />
            </motion.div>

            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                color="blue"
                fullWidth
                radius="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 transition-all duration-300 shadow-sm"
              >
                Login
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>
    </Center>
  );
};

export default Login;
