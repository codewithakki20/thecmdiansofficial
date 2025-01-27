import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [nextEvent, setNextEvent] = useState(null);

  // Event data
  const events = [
    {
      title: "Yaadein 2.0",
      date: "February 25, 2025",
      location: "Hotel Ananda Imperial",
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

  // Countdown Timer Logic
  useEffect(() => {
    const findNextEvent = () => {
      const now = new Date();
      return events.find(event => new Date(event.date) > now);
    };

    const event = findNextEvent();
    if (event) {
      setNextEvent(event);

      const interval = setInterval(() => {
        const now = new Date();
        const eventDate = new Date(event.date);
        const difference = eventDate - now;

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
    } else {
      setTimeLeft("No upcoming events.");
    }
  }, [events]);

  const handleAddFeedback = () => navigate("/feedback");
  const handleImage = () => navigate("/images");
  const handleAnnouncementPage = () => navigate("/announcement");

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Welcome to The CMDians</h1>
        <p className="text-lg max-w-2xl mx-auto font-medium drop-shadow-sm">
          आकाशगंगा | EVENTs PLANNER FOR STUDENTS | HELP | MEMES | NEWS
        </p>
        <button
          onClick={handleAddFeedback}
          className="mt-8 px-8 py-3 bg-white text-[#7C295D] font-medium rounded-xl shadow-md hover:bg-gray-100 hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Add Your Feedback
        </button>
      </header>

      {/* Countdown Timer */}
      <section className="py-10 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Next Event Starts In:</h2>
        {nextEvent ? (
          <>
            <p className="text-lg text-gray-600 font-medium mb-2">
              {nextEvent.title} at {nextEvent.location} on {nextEvent.date}
            </p>
            <p className="text-2xl text-purple-600 font-semibold">{timeLeft}</p>
          </>
        ) : (
          <p className="text-lg text-red-600 font-medium">No upcoming events.</p>
        )}
      </section>

      {/* Announcement Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#F9A8D4] to-[#F3C7D9] text-white text-center">
        <h2 className="text-4xl font-bold mb-4"> Announcement</h2>
        <p className="text-lg font-medium">
          Stay tuned for our upcoming events and surprises! Join us for a thrilling year of fun and excitement at CMD College.
        </p>
        <button
          onClick={handleAnnouncementPage}
          className="mt-8 px-6 py-3 bg-white text-[#7C295D] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          Learn More
        </button>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { src: "/image1.jpeg", alt: "Beautiful Beach" },
            { src: "/image2.jpeg", alt: "Majestic Mountains" },
            { src: "/image3.jpeg", alt: "Serene Forest" },
            { src: "/image4.jpeg", alt: "City Lights" },
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
