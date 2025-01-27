import React from 'react';
import { useLocation } from 'react-router-dom';
import Ticket from '../components/Ticket';

const BookingConfirmation = () => {
  const location = useLocation();
  const { state } = location;
  const { bookingId, eventName, date, time, locationName, locationAddress, category, orderedBy } = state;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
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
  );
};

export default BookingConfirmation;