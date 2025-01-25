// /utils/upload.js
const multer = require('multer');

// Set up multer storage (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Multer middleware

module.exports = upload;
