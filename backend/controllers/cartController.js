const {
  addToCart,
  updateCartItem: updateCartItemService,
  getCartItems,
  removeCartItem,
} = require("../services/cartService");

exports.createCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400);
      throw new Error("productId and quantity are required");
    }

    const cartItem = await addToCart(req.user._id, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity) {
      res.status(400);
      throw new Error("Quantity is required");
    }

    const cartItem = await updateCartItemService(req.user._id, req.params.id, quantity);

    if (!cartItem) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    res.json(cartItem);
  } catch (error) {
    next(error);
  }
};

exports.fetchCartItems = async (req, res, next) => {
  try {
    const items = await getCartItems(req.user._id);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const deleted = await removeCartItem(req.user._id, req.params.id);

    if (!deleted) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
};
