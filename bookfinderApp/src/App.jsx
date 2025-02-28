import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import BookSearch from "./components/BookSearch";
import Favorites from "./components/Favorites";
import CreateBooks from "./components/CreateBooks";
import BookDetails from "./components/BookDetails";

const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
};

const AppContent = () => {
  const { theme } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={theme}
          className={`flex-1 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route
              path="/createBooks"
              element={
                <PrivateRoute>
                  <CreateBooks />
                </PrivateRoute>
              }
            />
            <Route path="/bookDetails/:id" element={<BookDetails />} />
            <Route path="/" element={<BookSearch />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MantineProvider>
  );
};

export default App;
