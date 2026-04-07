const getPagination = require("../utils/pagination");
const {
  getProducts,
  getProductById,
} = require("../services/productService");

exports.fetchProducts = async (req, res, next) => {
  try {
    const pagination = getPagination(req.query);
    const data = await getProducts(req.query, pagination);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.fetchProductById = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};
