const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Meme', memeSchema);
