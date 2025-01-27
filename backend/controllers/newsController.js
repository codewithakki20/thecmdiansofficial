const News = require('../models/NewsModel');

// Function to handle uploading news
// Upload news
const uploadNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Ensure both title and content are provided
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newNews = new News({
      title,
      content,
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);

  } catch (error) {
    res.status(500).json({ message: 'Error uploading news', error: error.message });
  }
};

// Function to retrieve all news
const getNews = async (req, res) => {
  try {
    const news = await News.find(); // Make sure `content` and `title` are present in the schema
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// Function to delete a specific news item
const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Delete the news item from the database
    await News.findByIdAndDelete(newsId);

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news', error: error.message });
  }
};

module.exports = { uploadNews, getNews, deleteNews };
