import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import server from '../environment';

const BookingPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1); // Default ticket count
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${server}/api/events/${id}`);
        setEvent(response.data.data); // Assuming the API response contains the event data
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Error fetching event details.");
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleTicketCountChange = (e) => {
    setTicketCount(e.target.value);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bookingData = {
        eventId: id,
        ticketCount,
        upiId: 'ankitpatel657843@okicici', // Replace with your UPI ID
      };
      
      // Call your API to create a booking (Assuming an API exists for booking)
      const response = await axios.post(`${server}/api/book/book-tickets`, bookingData);
      
      if (response.data.success) {
        // Navigate to PaymentPage after successful booking
        navigate('/payment', {
          state: {
            bookingId: response.data.bookingId,
            upiPaymentLink: response.data.upiPaymentLink,
            eventName: event.title,
            date: new Date(event.date).toLocaleDateString(),
            time: `${new Date(event.date).toLocaleTimeString()} to ${new Date(event.endDate).toLocaleTimeString()}`,
            locationName: event.location,
            locationAddress: event.address,
            category: event.category,
            orderedBy: 'John Doe', // Replace with actual user name
          },
        });
      }
    } catch (error) {
      console.error("Error booking tickets:", error);
      setError("Failed to book tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Book Tickets for {event.title}</h1>
        <img src={event.image.url} alt={event.title} className="w-full h-72 object-cover rounded-lg mb-6" />
        <p className="text-lg text-gray-600 mb-4">{event.description}</p>
        <p className="text-xl text-gray-700 mb-4">Location: {event.location}</p>
        <p className="text-xl text-gray-700 mb-6">Price per ticket: ${event.price}</p>

        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label htmlFor="ticketCount" className="block text-lg font-medium text-gray-700">Number of Tickets</label>
            <input
              type="number"
              id="ticketCount"
              name="ticketCount"
              value={ticketCount}
              onChange={handleTicketCountChange}
              min="1"
              max="10"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors w-full"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
