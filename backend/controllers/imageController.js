const Image = require('../models/imageModel');
const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file || !title) {
      return res.status(400).json({ message: 'Image file and title are required' });
    }

    const newImage = new Image({
      title,
      url: req.file.path,
      cloudinary_id: req.file.filename,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findByIdAndDelete(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
};


module.exports = { uploadImage, getImages, deleteImage };
