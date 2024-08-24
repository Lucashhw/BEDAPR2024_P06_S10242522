const Joi = require("joi");

const validateFeedback = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comments: Joi.string().min(3).max(200).required(),
  });

  const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return; // Terminate middleware execution on validation error
  }

  next(); // If validation passes, proceed to the next route handler
};

module.exports = validateFeedback;
