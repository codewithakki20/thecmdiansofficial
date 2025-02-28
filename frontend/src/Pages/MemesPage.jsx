import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'react-lazy-load-image-component/src/effects/blur.css';
import server from '../environment';

const MemeList = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${server}/api/memes?page=${page}`
        );
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setMemes((prevMemes) => (reset ? [...response.data] : [...prevMemes, ...response.data]));
        }
      } catch (err) {
        setError('Error fetching memes');
        showAlert('Error fetching memes', 'error');
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchMemes(true);
  }, [fetchMemes]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDownload = async (url, title) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = title || 'downloaded-meme';
      link.click();
      URL.revokeObjectURL(link.href);
      showAlert('Meme downloaded successfully', 'success');
    } catch (err) {
      showAlert('Error downloading meme. Please try again later.', 'error');
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${server}/api/memes/${deleteId}`
      );
      if (response.status === 200) {
        showAlert('Meme deleted successfully', 'success');
        setMemes((prevMemes) => prevMemes.filter((meme) => meme._id !== deleteId));
      }
    } catch (err) {
      showAlert('Error deleting meme', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const renderSkeleton = () => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="bg-gray-300 h-48 rounded-lg mb-4 animate-pulse"></div>
      <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
      <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );

  return (
    <section className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] text-white p-8 min-h-screen">
      {alert && (
        <div className={`alert ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-4 mb-4 text-center rounded`}>
          {alert.message}
        </div>
      )}
      <h2 className="text-3xl font-bold mb-8 text-center">Uploaded Memes</h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => renderSkeleton())}
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {memes.length === 0 && !loading && <p className="text-center">No memes available.</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {memes.map((meme) => (
          <li key={meme._id} className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
              style={{ backgroundImage: `url(${meme.url})` }}
              aria-label={meme.title || 'Meme'}
            ></div>
            <h3 className="text-lg font-bold text-gray-700 text-center mb-4">
              {meme.title || 'Untitled'}
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => handleDownload(meme.url, meme.title)}
                className="bg-gradient-to-r from-[#7C295D] to-purple-600 hover:from-[#7C295D] hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#7C295D] mt-6"
              >
                Download
              </button>
              <button
                onClick={() => confirmDelete(meme._id)}
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-6"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this meme?</p>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gradient-to-r from-gray-500 to-purple-600 hover:from-gray-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {!hasMore && <p className="text-center mt-8">No more memes to load.</p>}
    </section>
  );
};

export default MemeList;
