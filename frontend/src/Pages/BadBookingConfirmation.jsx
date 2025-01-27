import React from 'react';

const BadBookingConfirmation = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Booking Failed</h1>
      <p className="text-center text-red-500">Unfortunately, your booking could not be confirmed. Please try again later.</p>
    </div>
  );
};

export default BadBookingConfirmation;