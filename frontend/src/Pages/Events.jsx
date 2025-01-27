import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import server from '../environment';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${server}/api/events`);
        console.log('API response:', response.data); // Log the response data
        // Ensure the response data is an array
        if (Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleBooking = (eventId) => {
    navigate(`/book/${eventId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">Upcoming Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(events) && events.map((event) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src={event.image.url} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-gray-600 my-2">{event.location}</p>
              <p className="text-gray-700 mb-4">{event.description.substring(0, 100)}...</p>
              <p className="text-gray-700 mb-4"><strong>Price:</strong> ${event.price}</p>
              <p className="text-gray-700 mb-4"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleViewDetails(event._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleBooking(event._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors ml-2"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
