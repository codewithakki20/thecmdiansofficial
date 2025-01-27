import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import server from '../environment';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleCreateEvent = async () => {
    if (!title || !description || !price || !location || !date || !image) {
      setError('All fields are required!');
      return;
    }
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('date', date); // Append the date field
    formData.append('image', image);

    try {
      const response = await axios.post(`${server}/api/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Event created successfully!');
      setTimeout(() => navigate('/events'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setError('Failed to create event. Please try again later.');
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a New Fighting Event</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <div className="mt-4">
          <label htmlFor="title" className="block text-lg">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-lg">Event Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full h-32 rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="price" className="block text-lg">Ticket Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="location" className="block text-lg">Event Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="date" className="block text-lg">Event Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="image" className="block text-lg">Event Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 mt-2 w-full rounded"
          />
        </div>

        <button
          onClick={handleCreateEvent}
          disabled={loading}
          className="bg-blue-500 text-white p-2 mt-6 rounded w-full disabled:bg-gray-500"
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
