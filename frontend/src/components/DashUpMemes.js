import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import server from '../environment';

const UploadMeme = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim() || !image) {
      setError('Please provide a title and select an image.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('memeImage', image);
    formData.append('title', title);

    try {
      const response = await axios.post(`${server}/api/memes/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage('Meme uploaded successfully!');
      console.log('Uploaded Meme:', response.data);

      setTimeout(() => {
        navigate('/memes');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading meme.');
      console.error('Upload Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setError('Invalid file type. Please upload a JPG or PNG image.');
        setImage(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds the 5MB limit.');
        setImage(null);
        return;
      }

      setImage(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7C295D] to-[#F3C7D9]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

        <h2 className="text-3xl font-bold mb-6 text-[#7C295D]">Upload Your Meme</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Enter meme title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-bold rounded-lg ${
              loading ? 'bg-[#7C295D]' : 'bg-[#7C295D] hover:bg-purple-700'
            }`}
          >
            {loading ? 'Uploading...' : 'Upload Meme'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMeme;
