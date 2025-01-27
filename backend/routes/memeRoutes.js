const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { uploadMeme, getMemes, deleteMeme } = require('../controllers/memeController');

// Route to upload a meme
router.post('/upload', upload.single('memeImage'), uploadMeme);


// Route to fetch all memes
router.get('/', getMemes);

// Route to delete a meme by ID
router.delete('/:id', deleteMeme);

module.exports = router;
