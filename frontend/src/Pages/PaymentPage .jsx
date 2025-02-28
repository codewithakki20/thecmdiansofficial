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
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Complete Your Payment</h1>
        {upiPaymentLink ? (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-center mb-4">UPI Payment</h2>
            <p className="text-center text-gray-600 mb-4">
              Scan the QR code or use the link below to complete your payment:
            </p>
            <div className="flex justify-center mt-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  upiPaymentLink
                )}&size=200x200`}
                alt="UPI QR Code"
                className="shadow-md rounded-lg"
              />
            </div>
            <p className="text-center mt-4">
              <a
                href={upiPaymentLink}
                className="text-blue-500 underline hover:text-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pay with UPI
              </a>
            </p>
          </div>
        ) : (
          <p className="text-center text-red-500 mt-6">No UPI payment link provided.</p>
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
    </div>
  );
};

export default PaymentPage;
