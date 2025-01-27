const express = require('express');
const { bookTickets, verifyPayment } = require('../controllers/bookController');

const router = express.Router();

// Route to create Razorpay order
router.post('/book-tickets', bookTickets);

// Route to verify Razorpay payment
router.post('/verify-payment', verifyPayment);

module.exports = router;