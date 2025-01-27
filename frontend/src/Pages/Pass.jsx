import React from "react";

const Ticket = () => {
  const downloadTicket = () => {
    const link = document.createElement("a");
    link.href = "https://i.ibb.co/W3cK42J/image-1.png";  // Replace with your ticket image or file URL
    link.download = "event_ticket.png";
    link.click();
  };

  return (
    <div className="relative flex flex-col md:flex-row border border-gray-300 m-4 rounded-lg overflow-hidden shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('https://your-image-url.com/path-to-image.jpg')" }}>
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg z-0"></div>

      {/* Left side (Image Section) */}
      <div className="relative md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300 p-6 z-10">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white border-2 border-gray-300 w-8 h-8 rotate-45 rounded-full"></div>
        <img
          src="https://i.ibb.co/W3cK42J/image-1.png"
          alt="Event"
          className="w-full h-64 object-cover rounded-md"
        />
      </div>

      {/* Center Section */}
      <div className="p-6 flex-1 z-10">
        {/* Event Name */}
        <div className="mb-6">
          <span className="text-primary text-xs uppercase font-medium">Your ticket for</span>
          <h2 className="text-2xl font-semibold mt-1">The event name</h2>
        </div>

        {/* Date and Location Information */}
        <div className="flex mb-6">
          <div className="w-1/2 pr-4">
            <span className="text-gray-600 text-xs uppercase font-semibold">Date and time</span>
            <span className="block text-lg font-medium">Thursday, May 14 2020</span>
            <span className="block text-sm text-gray-500">7:00 am to 9:00 pm (GMT+1)</span>
          </div>
          <div className="w-1/2 pl-4">
            <span className="text-gray-600 text-xs uppercase font-semibold">Location</span>
            <span className="block text-lg font-medium">Location name</span>
            <span className="block text-sm text-gray-500">Location complete address, Town, COUNTRY</span>
          </div>
        </div>

        {/* Ticket Type and Order Info */}
        <div className="flex">
          <div className="w-1/2 pr-4">
            <span className="text-gray-600 text-xs uppercase font-semibold">Ticket type</span>
            <span className="block text-lg font-medium">Event category</span>
          </div>
          <div className="w-1/2 pl-4">
            <span className="text-gray-600 text-xs uppercase font-semibold">Order info</span>
            <span className="block text-lg font-medium">Order #0123456789. Ordered By John DOE</span>
          </div>
        </div>
      </div>

      {/* Right Side (QR Code and Logo) */}
      <div className="relative bg-primary text-white p-6 md:w-1/3 z-10">
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white border-2 border-gray-300 w-8 h-8 rotate-45 rounded-full"></div>
        <div className="mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png"
            alt="QR Code"
            className="w-32 h-32 object-cover mx-auto"
          />
        </div>
        <div className="mt-6">
          <img
            src="https://qidoon.com/assets/img/logo.svg"
            alt="Logo"
            className="mx-auto opacity-50 invert"
          />
        </div>
      </div>

      {/* Download Button without Image */}
      <div className="w-full text-center mt-6 md:mt-8 z-10">
        <button 
          onClick={downloadTicket}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
