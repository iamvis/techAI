const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCartItem,
  updateCartItem,
  fetchCartItems,
  deleteCartItem,
} = require("../controllers/cartController");

router.use(authMiddleware);
router.post("/", createCartItem);
router.put("/:id", updateCartItem);
router.get("/", fetchCartItems);
router.delete("/:id", deleteCartItem);

module.exports = router;
