const Feedback = require("../models/feedbacks");
const Book = require("../models/feedbacks");

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.getAllFeedbacks();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Feedbacks");
  }
};

const getFeedbackById = async (req, res) => {
  const feedbackId = parseInt(req.params.id);
  try {
    const feedback = await Book.getBookById(feedbackId);
    if (!feedback) {
      return res.status(404).send("Feedback not found");
    }
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving feedback");
  }
};

module.exports = {
    getAllFeedbacks,
    getFeedbackById,
};