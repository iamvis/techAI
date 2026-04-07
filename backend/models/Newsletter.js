const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
