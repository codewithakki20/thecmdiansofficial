import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import server from '../environment';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${server}/api/news?page=${page}`
        );
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setNews((prevNews) => (reset ? [...response.data] : [...prevNews, ...response.data]));
        }
      } catch (err) {
        setError('Error fetching news');
        showAlert('Error fetching news', 'error');
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchNews(true);
  }, [fetchNews]);

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

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${server}/api/news/${id}`);
      setNews((prevNews) => prevNews.filter((item) => item._id !== id));
      showAlert('News deleted successfully!', 'success');
    } catch (err) {
      showAlert('Error deleting news', 'error');
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
      <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => renderSkeleton())}
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {news.length === 0 && !loading && <p className="text-center">No news available.</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {news.map((item) => (
          <li key={item._id} className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold text-gray-700 text-center mb-4">
              {item.title || 'Untitled'}
            </h3>
            <p className="text-gray-600 text-center mb-4">{item.content}</p>
            <button
              onClick={() => deleteNews(item._id)}
              className="w-full px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {!hasMore && <p className="text-center mt-8">No more news to load.</p>}
    </section>
  );
};

export default NewsPage;
