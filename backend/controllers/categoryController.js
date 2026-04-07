const { getCategories } = require("../services/categoryService");

exports.fetchCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
