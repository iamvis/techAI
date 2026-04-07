const Newsletter = require("../models/Newsletter");

const subscribeNewsletter = async (email) => {
  const existing = await Newsletter.findOne({ email: email.toLowerCase() });

  if (existing) {
    return existing;
  }

  return Newsletter.create({ email: email.toLowerCase() });
};

module.exports = { subscribeNewsletter };
