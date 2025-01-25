import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Import QRCode library

const PassPage = () => {
  const { paymentToken } = useParams(); // Get token from the route parameter
  const [token] = useState(paymentToken || ''); // Store the token, no need for setToken
  const [registrationData, setRegistrationData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // If there's no token, redirect to home
    if (!token) {
      navigate('/');
      return;
    }

    // Retrieve registration data from localStorage
    const storedData = JSON.parse(localStorage.getItem("registrationData")) || {};
    setRegistrationData(storedData);
  }, [token, navigate]);

  const eventDetails = {
    title: "CMD College Annual Picnic",
    location: "CMD College Campus, City",
    amount: "$30",
    image: "/image2.jpeg", // Example event image path
  };

  const handleDownloadPass = () => {
    const passContent = `
      Event Pass
      ---------------------
      Event Title: ${eventDetails.title}
      Location: ${eventDetails.location}
      Amount: ${eventDetails.amount}

      Name: ${registrationData?.name || 'John Doe'}
      Father's Name: ${registrationData?.fatherName || 'Mr. Doe'}
      Mobile Number: ${registrationData?.mobileNumber || '1234567890'}
      Token: ${token}
    `;

    const blob = new Blob([passContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "EventPass.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] text-white p-8">
      <div className="max-w-lg mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#7C295D] mb-4">Your Event Pass</h1>

        {/* Event Image */}
        <div className="mb-6">
          <img
            src={eventDetails.image}
            alt={eventDetails.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Event & User Details */}
        <div className="space-y-4 text-gray-700">
          <div><strong>Event Title:</strong> {eventDetails.title}</div>
          <div><strong>Location:</strong> {eventDetails.location}</div>
          <div><strong>Amount:</strong> {eventDetails.amount}</div>
          <div><strong>Name:</strong> {registrationData?.name || 'John Doe'}</div>
          <div><strong>Father's Name:</strong> {registrationData?.fatherName || 'Mr. Doe'}</div>
          <div><strong>Mobile Number:</strong> {registrationData?.mobileNumber || '1234567890'}</div>
          <div><strong>Token:</strong> {token}</div>
        </div>

        {/* QR Code */}
        <div className="text-center mt-6">
          <QRCodeSVG value={token} size={128} />
        </div>

        {/* Buttons */}
        <div className="mt-8 text-center space-y-4">
          <button
            onClick={handleDownloadPass}
            className="px-6 py-3 bg-[#7C295D] text-white font-bold rounded-lg"
          >
            Download Pass
          </button>

          {/* Navigate to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassPage;
