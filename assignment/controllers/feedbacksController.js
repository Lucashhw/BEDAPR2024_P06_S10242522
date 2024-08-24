const Feedback = require("../models/feedbacks");


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
    const feedback = await Feedback.getFeedbackById(feedbackId);
    if (!feedback) {
      return res.status(404).send("Feedback not found");
    }
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving feedback");
  }
};

const createFeedback = async (req, res) => {
  const newFeedback = req.body;
  try {
    const createdFeedback = await Feedback.createFeedback(newFeedback);
    res.status(201).json(createdFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Feedback");
  }
};

const deleteFeedback = async (req, res) => {
  const feedbackId = parseInt(req.params.id);

  try {
    const success = await Feedback.deleteFeedback(feedbackId);
    if (!success) {
      return res.status(404).send("Feedback not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Feedback");
  }
};



module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    deleteFeedback,
};



