const express = require("express");
const router = express.Router();
const {
  fetchProducts,
  fetchProductById,
} = require("../controllers/productController");

router.get("/", fetchProducts);
router.get("/:id", fetchProductById);

module.exports = router;
