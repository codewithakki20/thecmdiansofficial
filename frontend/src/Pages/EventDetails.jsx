import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import server from '../environment';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${server}/api/events/${id}`)
        .then(response => {
          setEvent(response.data);
        })
        .catch(error => {
          console.error('Error fetching event:', error);
        });
    } else {
      console.error('Event ID is undefined');
    }
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{event.description}</p>
      <p className="mt-4"><strong>Price:</strong> ${event.price}</p>
      <p className="mt-4"><strong>Location:</strong> {event.location}</p>
      <p className="mt-4"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <button
        onClick={() => navigate('/events')}
        className="bg-gray-500 text-white p-2 mt-4 rounded ml-4"
      >
        Back to Events
      </button>
    </div>
  );
};

export default EventDetails;