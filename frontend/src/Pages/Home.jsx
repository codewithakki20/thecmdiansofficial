import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown Timer Logic
  useEffect(() => {
    const events = [
      {
        title: "Spring Picnic 2025",
        date: "March 15, 2025",
        location: "Green Park",
      },
      {
        title: "Summer Bash 2025",
        date: "June 10, 2025",
        location: "Sunny Beach",
      },
      {
        title: "Autumn Feast 2025",
        date: "September 25, 2025",
        location: "Maple Woods",
      },
    ];

    const nextEventDate = new Date(events[0].date);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = nextEventDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft("The event is happening now!");
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once

  const handleAddFeedback = () => {
    navigate("/feedback");
  };

  const handleImage = () => {
    navigate("/images");
  };

  const organizers = [
    { name: "John Doe", role: "Event Coordinator" },
    { name: "Jane Smith", role: "Creative Director" },
    { name: "Alice Johnson", role: "Marketing Manager" },
    { name: "Jane Smith", role: "Creative Director" },
    { name: "Alice Johnson", role: "Marketing Manager" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen">
      {/* Hero Section */}
      <header className="text-white py-20 text-center">
        <h1 className="text-6xl font-extrabold mb-4">
          Welcome to The CMDians
        </h1>
        <p className="text-lg">
          आकाशगंगा EVENTs PLANNER FOR STUDENTS  HELP MEMES NEWS EVENTs
        </p>
        <button
          onClick={handleAddFeedback}
          className="mt-6 px-6 py-3 bg-white text-[#7C295D] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          Add Your Feedback
        </button>
      </header>

      {/* Countdown Timer */}
      <section className="py-10 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Next Event Starts In:
        </h2>
        <p className="text-2xl text-purple-600 font-semibold">{timeLeft}</p>
      </section>

      {/* Organizers Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-indigo-500 to-indigo-400 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Organized By</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {organizers.map((organizer, index) => (
            <div
              key={index}
              className="bg-white text-indigo-600 p-4 rounded shadow-lg font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-xl font-bold">{organizer.name}</h3>
              <p className="text-gray-700 text-sm mt-1">{organizer.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{
              src: "/image1.jpeg",
              alt: "Beautiful Beach",
              title: "Beautiful Beach",
            },
            {
              src: "/image2.jpeg",
              alt: "Majestic Mountains",
              title: "Majestic Mountains",
            },
            {
              src: "/image3.jpeg",
              alt: "Serene Forest",
              title: "Serene Forest",
            },
            { src: "/image4.jpeg", alt: "City Lights", title: "City Lights" },
          ].map((img, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleImage}
          className="block mx-auto mt-8 px-6 py-3 bg-gradient-to-r from-[#7C295D] to-purple-600 text-white font-semibold rounded-lg hover:bg-[#7C295D] transition duration-300 transform hover:scale-105"
        >
          View All Images
        </button>
      </section>
    </div>
  );
};

export default HomePage;
