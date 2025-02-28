const express = require("express");
const router = express.Router();
const {
  testDB,
  createBook,
  getBooks,
} = require("../controllers/bookController");
const authenticateToken = require("../middleware/authMiddleware");

// Pass upload middleware to the router
module.exports = (upload) => {
  router.get("/test-db", testDB);
  router.post("/", authenticateToken, upload.single("coverImage"), createBook);
  router.get("/", getBooks);

  return router;
};
