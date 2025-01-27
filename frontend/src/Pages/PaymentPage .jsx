import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { bookingId, upiPaymentLink, eventName, date, time, locationName, locationAddress, category, orderedBy } = state;

  const handlePaymentSuccess = () => {
    // Navigate to BookingConfirmation after successful payment
    navigate('/booking-confirmation', {
      state: {
        bookingId,
        eventName,
        date,
        time,
        locationName,
        locationAddress,
        category,
        orderedBy,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Complete Your Payment</h1>
      {upiPaymentLink && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">UPI Payment</h2>
          <p className="text-center">Scan the QR code or use the link below to complete the payment:</p>
          <div className="flex justify-center mt-4">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiPaymentLink)}&size=200x200`} alt="UPI QR Code" />
          </div>
          <p className="text-center mt-4">
            <a href={upiPaymentLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Pay with UPI</a>
          </p>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePaymentSuccess}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Payment Successful
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;