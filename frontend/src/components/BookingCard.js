import React from "react";

const TicketBookingCard = ({ event, onBook }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Price:</strong> ₹{event.price}
          </p>
        </div>
        <button
          onClick={() => onBook(event.id)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default TicketBookingCard;
