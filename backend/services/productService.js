const Product = require("../models/Product");

const buildProductQuery = ({ category, rating, minPrice, maxPrice, search }) => {
  const query = {};

  // Category filter
  if (category) {
    query.category = category;
  }

  // Rating filter (e.g. rating >= selected)
  if (rating && !isNaN(rating)) {
    query.rating = { $gte: Number(rating) };
  }

  // Price filter
  if ((minPrice && !isNaN(minPrice)) || (maxPrice && !isNaN(maxPrice))) {
    query.price = {};

    if (minPrice && !isNaN(minPrice)) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice && !isNaN(maxPrice)) {
      query.price.$lte = Number(maxPrice);
    }
  }

  // Search filter
  if (search && search.trim() !== "") {
    query.$or = [
      { name: { $regex: search.trim(), $options: "i" } },
      { description: { $regex: search.trim(), $options: "i" } },
    ];
  }

  return query;
};

const buildSortOption = (sort) => {
  const sortOptions = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    newest: { createdAt: -1 },
    popularity: { numReviews: -1, rating: -1 },
  };

  return sortOptions[sort] || { createdAt: -1 };
};

const getProducts = async (queryParams = {}, pagination = {}) => {
  const query = buildProductQuery(queryParams);
  const sortOption = buildSortOption(queryParams.sort);

  const requestedPage = Number(pagination.page) || 1;
  const limit = Number(pagination.limit) || 10;

  const total = await Product.countDocuments(query);
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  const page = totalPages === 0 ? 1 : Math.min(requestedPage, totalPages);
  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  return {
    products,
    page,
    totalPages,
    total,
  };
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const getTopSellingProducts = async (limit = 8) => {
  return Product.find({})
    .sort({ numReviews: -1, rating: -1 })
    .limit(limit);
};

module.exports = {
  getProducts,
  getProductById,
  getTopSellingProducts,
};
