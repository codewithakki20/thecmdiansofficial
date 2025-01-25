import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();

  const generateToken = () => {
    // Create a unique token for the event (could be a random string or ID)
    const token = Math.random().toString(36).substring(2, 15);
    return token;
  };

  const handleRegister = (eventToken) => {
    setRegistering(true);
    setTimeout(() => {
      setRegistering(false);
      // Pass the generated event token to the registration page
      navigate(`/register/${eventToken}`);
    }, 2000);
  };

  const events = [
    {
      title: "CMD College Annual Picnic",
      description: "A fun-filled day with games, food, and activities for all.",
      image: "./image1.jpeg",
      location: "CMD College Campus, City",
      entryFees: "$30",
    },
    {
      title: "Tech Conference 2025",
      description: "A day of insightful talks from industry leaders about tech innovation.",
      image: "./image2.jpeg",
      location: "Tech Auditorium, Downtown City",
      entryFees: "$100",
    },
    {
      title: "CMDians Music Fest",
      description: "A live music event featuring local bands and performers.",
      image: "./image3.jpeg",
      location: "CMD College Grounds, City",
      entryFees: "$20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] text-white p-8">
      {events.map((event, index) => (
        <div key={index} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-center text-[#7C295D] mb-4">{event.title}</h1>
            <div
              className="w-full h-80 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${event.image})` }}
            ></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700">{event.description}</p>
            <div className="flex justify-between text-lg text-gray-700">
              <div><strong>Location:</strong> {event.location}</div>
              <div><strong>Entry Fees:</strong> {event.entryFees}</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => handleRegister(generateToken())}
              className={`px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 ${
                registering ? "bg-gray-400" : "bg-[#7C295D] hover:bg-[#5e1f48]"
              }`}
              disabled={registering}
            >
              {registering ? "Registering..." : "Register Now"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventPage;
