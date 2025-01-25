import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv) {
      // Simulating a successful payment process
      setIsPaymentSuccessful(true);

      // Simulating payment success with a random token generation
      const paymentToken = Math.random().toString(36).substring(7);

      // Store the payment token in localStorage or pass it to the next page
      localStorage.setItem("paymentToken", paymentToken);

      // After payment success, navigate to the pass page
      setTimeout(() => {
        navigate(`/pass/${paymentToken}`);
      }, 2000);
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] text-white p-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-[#7C295D] mb-8">Payment</h1>

        <div className="space-y-4">
          {/* Card Number Field */}
          <div>
            <label htmlFor="cardNumber" className="block text-lg text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Expiry Date Field */}
          <div>
            <label htmlFor="expiryDate" className="block text-lg text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* CVV Field */}
          <div>
            <label htmlFor="cvv" className="block text-lg text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Payment Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-[#7C295D] text-white font-bold rounded-lg"
            >
              {isPaymentSuccessful ? "Processing Payment..." : "Pay Now"}
            </button>
          </div>
        </div>

        {isPaymentSuccessful && (
          <div className="mt-6 text-center text-green-500">Payment Successful!</div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
