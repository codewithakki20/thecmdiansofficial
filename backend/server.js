const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json()); // To parse incoming JSON requests
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://thecmdiansofficial.onrender.com'],
    credentials: true,
  })
);

// Import routes
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const imageRoutes = require('./routes/imageRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const newsRoutes = require('./routes/newsRoutes');
const memeRoutes = require('./routes/memeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookRoutes = require('./routes/bookRouter'); // Ensure this line is present

// Define API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/memes', memeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/book', bookRoutes); // Ensure this line is present

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));