const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors({ origin: ['http://localhost:3000', 'https://thecmdiansofficial.onrender.com'], credentials: true })); // Allow CORS from React app

// Routes
const imageRoutes = require('./routes/imageRoutes'); // Route for images
const feedbackRoutes = require('./routes/feedbackRoutes'); // New route for feedback

// Define API routes
app.use('/api/images', imageRoutes); // Image routes
app.use('/api/feedbacks', feedbackRoutes); // Feedback routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
