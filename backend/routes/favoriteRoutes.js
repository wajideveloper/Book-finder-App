const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, addFavorite);
router.get("/", authenticateToken, getFavorites);
router.delete("/:id", authenticateToken, removeFavorite);

module.exports = router;
