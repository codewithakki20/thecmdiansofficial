const Booking = require('../models/bookModel'); // Mongoose Booking Schema
const Event = require('../models/eventModel'); // Mongoose Event Schema
const mongoose = require('mongoose');
const crypto = require('crypto');

// Book Tickets
const bookTickets = async (req, res) => {
    try {
        const { eventId, ticketCount } = req.body;

        // Validate event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Validate ticket quantity
        if (ticketCount <= 0 || !Number.isInteger(ticketCount)) {
            return res.status(400).json({ message: 'Invalid ticket quantity' });
        }

        // Calculate total amount
        const amount = ticketCount * event.price;

        // Generate UPI payment link with your UPI ID
        const upiId = 'ankit@okicici';
        const upiPaymentLink = `upi://pay?pa=${upiId}&pn=EventBooking&am=${amount}&cu=INR`;

        res.status(200).json({
            success: true,
            upiPaymentLink,
            amount,
            currency: 'INR',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating UPI payment link', error });
    }
};

// Verify Payment (Callback or Webhook)
const verifyPayment = async (req, res) => {
    const { eventId, userId, tickets, paymentId } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // For UPI payments, you would typically verify the payment through a webhook or callback from the UPI provider
        // Here, we'll assume the payment is verified for demonstration purposes

        // Check if user has already booked tickets for this event
        const existingBooking = await Booking.findOne({ userId, eventId });

        if (existingBooking) {
            return res.status(400).json({ message: 'User has already booked tickets for this event' });
        }

        // Save booking details to the database
        const newBooking = new Booking({
            userId,
            eventId,
            tickets,
            paymentId,
        });

        await newBooking.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        res.status(200).json({ message: 'Payment verified and booking successful!' });
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({ message: 'Error verifying payment', error });
    } finally {
        session.endSession();
    }
};

module.exports = {
    bookTickets,
    verifyPayment,
};