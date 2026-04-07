const Cart = require("../models/Cart");

const addToCart = async (productId, quantity) => {
  const existingItem = await Cart.findOne({ productId });

  if (existingItem) {
    existingItem.quantity += Number(quantity);
    existingItem.quantity = Math.max(1, existingItem.quantity);
    return existingItem.save();
  }

  return Cart.create({ productId, quantity: Number(quantity) });
};

const updateCartItem = async (id, quantity) => {
  return Cart.findByIdAndUpdate(
    id,
    { quantity: Math.max(1, Number(quantity)) },
    { new: true }
  );
};

const getCartItems = async () => {
  return Cart.find({}).populate({ path: "productId", select: "name price discountPrice image stock rating" });
};

const removeCartItem = async (id) => {
  return Cart.findByIdAndDelete(id);
};

module.exports = {
  addToCart,
  updateCartItem,
  getCartItems,
  removeCartItem,
};
