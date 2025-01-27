const express = require('express');
const router = express.Router();
const { uploadNews, getNews, deleteNews } = require('../controllers/newsController');

// Route to upload news (title and content)
router.post('/upload', uploadNews);

// Route to fetch all news
router.get('/', getNews);

// Route to delete specific news by ID
router.delete('/:id', deleteNews);

module.exports = router;
