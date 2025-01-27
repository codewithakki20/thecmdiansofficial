import React from 'react';
import { useLocation } from 'react-router-dom';
import Ticket from '../components/Ticket';

const BookingConfirmation = () => {
  const location = useLocation();
  const { state } = location;
  const { bookingId, eventName, date, time, locationName, locationAddress, category, orderedBy } = state;

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Booking Confirmation</h1>
        <Ticket
          eventName={eventName}
          date={date}
          time={time}
          location={{ name: locationName, address: locationAddress }}
          category={category}
          orderId={bookingId}
          orderedBy={orderedBy}
        />
      </div>
    </div>
  );
};

export default BookingConfirmation;
