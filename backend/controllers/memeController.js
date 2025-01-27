const Meme = require('../models/MemeModel');
const cloudinary = require('../config/cloudinary');

const uploadMeme = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file || !title) {
      return res.status(400).json({ message: 'Meme file and title are required' });
    }

    // Check if the file type is valid (could be handled by multer too)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only jpeg, png, and jpg are allowed.' });
    }

    // Upload meme to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    if (!uploadResult) {
      return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
    }

    const newMeme = new Meme({
      title,
      url: uploadResult.secure_url,  // Cloudinary URL
      cloudinary_id: uploadResult.public_id,  // Cloudinary public ID
    });

    const savedMeme = await newMeme.save();
    res.status(201).json(savedMeme);
  } catch (error) {
    console.error('Error uploading meme:', error);
    res.status(500).json({ message: 'Error uploading meme', error: error.message });
  }
};


const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find();
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memes', error: error.message });
  }
};

const deleteMeme = async (req, res) => {
  try {
    const memeId = req.params.id;
    const meme = await Meme.findByIdAndDelete(memeId);

    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    // Delete meme from Cloudinary if cloudinary_id exists
    if (meme.cloudinary_id) {
      await cloudinary.uploader.destroy(meme.cloudinary_id);
    }

    res.status(200).json({ message: 'Meme deleted successfully' });
  } catch (err) {
    console.error('Error deleting meme:', err);
    res.status(500).json({ message: 'Error deleting meme', error: err.message });
  }
};

module.exports = { uploadMeme, getMemes, deleteMeme };
