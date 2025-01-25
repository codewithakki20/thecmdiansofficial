const Feedback = require('../models/feedbackModel');

// Fetch all feedbacks
const fetchFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
};

// Post feedback
const postFeedback = async (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: "Error posting feedback" });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback" });
  }
};

module.exports = { postFeedback, fetchFeedbacks, deleteFeedback };
