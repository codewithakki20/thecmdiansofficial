import React from "react";
import { useNavigate } from "react-router-dom";

const AnnouncementPage = () => {
  const navigate = useNavigate();

  const announcements = [
    {
      title: "Spring Picnic 2025 Announcement",
      date: "February 25, 2025",
      content: "Join us for the Spring Picnic 2025! Mark your calendars for an unforgettable experience at Green Park.",
    },
    {
      title: "Summer Bash 2025 Announcement",
      date: "April 15, 2025",
      content: "Get ready for the biggest Summer Bash of 2025 at Sunny Beach. Fun, music, and games await you!",
    },
    {
      title: "Autumn Feast 2025 Announcement",
      date: "August 25, 2025",
      content: "Celebrate the season with our Autumn Feast! A day full of food, fun, and festivities at Maple Woods.",
    },
  ];

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen">
      {/* Header Section */}
      <header className="text-white py-20 text-center">
        <h1 className="text-6xl font-extrabold mb-4"> Announcements</h1>
        <p className="text-lg">
          Stay updated with the latest news and announcements for upcoming events at CMD College.
        </p>
        <button
          onClick={handleBack}
          className="mt-6 px-6 py-3 bg-white text-[#7C295D] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          Go Back
        </button>
      </header>

      {/* Announcements Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-3xl font-semibold text-[#7C295D] mb-4">{announcement.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{announcement.date}</p>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnnouncementPage;
