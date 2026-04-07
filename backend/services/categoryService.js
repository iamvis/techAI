const Category = require("../models/Category");

const getCategories = async () => {
  return Category.find({}).sort({ name: 1 });
};

module.exports = { getCategories };
