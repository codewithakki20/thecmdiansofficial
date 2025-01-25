const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { uploadImage, getImages, deleteImage } = require('../controllers/imageController');

// Route to upload an image
router.post('/upload', upload.single('image'), uploadImage);;

// Route to fetch all images
router.get('/', getImages);

// Route to delete an image
router.delete('/:id', deleteImage);

module.exports = router;
