const Cart = require("../models/Cart");

const cartItemPopulate = {
  path: "productId",
  select: "name price discountPrice image stock rating",
};

const addToCart = async (userId, productId, quantity) => {
  const existingItem = await Cart.findOne({ user: userId, productId });

  if (existingItem) {
    existingItem.quantity += Number(quantity);
    existingItem.quantity = Math.max(1, existingItem.quantity);
    await existingItem.save();
    return existingItem.populate(cartItemPopulate);
  }

  const cartItem = await Cart.create({ user: userId, productId, quantity: Number(quantity) });
  return cartItem.populate(cartItemPopulate);
};

const updateCartItem = async (userId, id, quantity) => {
  return Cart.findOneAndUpdate(
    { _id: id, user: userId },
    { quantity: Math.max(1, Number(quantity)) },
    { new: true }
  ).populate(cartItemPopulate);
};

const getCartItems = async (userId) => {
  return Cart.find({ user: userId }).populate(cartItemPopulate);
};

const removeCartItem = async (userId, id) => {
  return Cart.findOneAndDelete({ _id: id, user: userId });
};

module.exports = {
  addToCart,
  updateCartItem,
  getCartItems,
  removeCartItem,
};
