import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import server from '../environment';

const UploadNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validate input: Title and Content are required
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${server}/api/news/upload`, {
        title,
        content,
      });

      setSuccessMessage('News uploaded successfully!');
      console.log('Uploaded News:', response.data);

      setTimeout(() => {
        navigate('/news');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading news.');
      console.error('Upload Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7C295D] to-[#F3C7D9]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

        <h2 className="text-3xl font-bold mb-6 text-[#7C295D]">Upload Your News</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Enter news title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Enter news content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-bold rounded-lg ${
              loading ? 'bg-[#7C295D]' : 'bg-[#7C295D] hover:bg-purple-700'
            }`}
          >
            {loading ? 'Uploading...' : 'Upload News'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNews;
