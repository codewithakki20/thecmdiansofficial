import React, { useState, useEffect } from 'react';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  // Fetch news articles from backend or API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news'); // Replace with your API endpoint
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Latest News & Updates
        </h1>

        {news.length === 0 ? (
          <p className="text-center text-gray-200">No news available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
              >
                <img
                  src={item.image || '/default-news.jpg'} // Replace with your default image if no image is provided
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-[#7C295D] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    {item.description.slice(0, 100)}...
                  </p>
                  <a
                    href={item.link || '#'} // Replace with the article link or route
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C295D] font-bold hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
