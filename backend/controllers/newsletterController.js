const { subscribeNewsletter } = require("../services/newsletterService");

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.createSubscription = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address.");
    }

    const subscriber = await subscribeNewsletter(email);
    res.status(201).json({ message: "Subscribed successfully", email: subscriber.email });
  } catch (error) {
    next(error);
  }
};
