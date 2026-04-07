const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Newsletter = require("./models/Newsletter");
const Cart = require("./models/Cart");

const products = require("./data/products");
const categories = require("./data/categories");

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Category.deleteMany();
    await Newsletter.deleteMany();
    await Cart.deleteMany();

    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

seedDatabase();
